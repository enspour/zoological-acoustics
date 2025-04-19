import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
} from '@angular/core';
import {
  outputFromObservable,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { layoutObservable } from '@kudu-ng-utils';

import { KuduZoneDirective } from '../../../zone';

import { KuduOverlayComponent } from '../overlay/overlay.component';

import { FALLBACK_POSITIONS, LAYOUT_GETTER } from '../../constants';

import { KuduOverlayPosition } from '../../interfaces';

@Component({
  selector: 'kudu-overlay-content',
  imports: [],
  templateUrl: './overlay-content.component.html',
  styleUrl: './overlay-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.top.px]': 'layout()?.top',
    '[style.left.px]': 'layout()?.left',
    '[style.width.px]': 'layout()?.width',
  },
  hostDirectives: [KuduZoneDirective],
})
export class KuduOverlayContentComponent {
  private document = inject(DOCUMENT);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private overlay = inject(KuduOverlayComponent);

  private origin = toSignal(
    toObservable(this.overlay.origin).pipe(
      switchMap((origin) => layoutObservable(origin.elementRef)),
    ),
  );

  private self = computed(() => this.getSelf());

  public position = computed(() => this.getPosition());
  public positionChange = outputFromObservable(toObservable(this.position));

  public layout = computed(() => this.getLayout());

  private getLayout() {
    const origin = this.origin();
    const self = this.self();

    if (!origin || !self) {
      return new DOMRect();
    }

    const config = this.overlay.config();

    const { top, left } = LAYOUT_GETTER[this.position()](origin, self, config);
    return new DOMRect(left, top, self.width, self.height);
  }

  private getSelf() {
    const origin = this.origin();

    if (!origin) {
      return undefined;
    }

    const config = this.overlay.config();

    const self = this.elementRef.nativeElement.getBoundingClientRect();
    self.width = config.width === 'origin-width' ? origin.width : self.width;

    return self;
  }

  private getPosition() {
    const origin = this.origin();
    const self = this.self();

    if (!origin || !self) {
      return this.overlay.config().position;
    }

    const config = this.overlay.config();

    if (config.lockX && config.lockY) {
      return config.position;
    }

    const initial = config.position;

    let maxFitPercent = 0;
    let maxFitPosition: KuduOverlayPosition | null = null;

    const positions = [initial, ...FALLBACK_POSITIONS[initial]].filter(
      (position) => this.isLock(position),
    );

    for (const position of positions) {
      const { top, left } = LAYOUT_GETTER[position](origin, self, config);

      const rect = new DOMRect(left, top, self.width, self.height);
      const percent = this.getVisiblePercent(rect);

      if (percent === 100) {
        return position;
      }

      if (maxFitPercent < percent) {
        maxFitPercent = percent;
        maxFitPosition = position;
      }
    }

    return maxFitPosition || initial;
  }

  private isLock(position: KuduOverlayPosition) {
    const config = this.overlay.config();

    if (
      config.lockX &&
      ((config.position.includes('left') && !position.includes('left')) ||
        (config.position.includes('right') && !position.includes('right')))
    ) {
      return false;
    }

    if (
      config.lockY &&
      ((config.position.includes('under') && !position.includes('under')) ||
        (config.position.includes('above') && !position.includes('above')))
    ) {
      return false;
    }

    return true;
  }

  public getVisiblePercent(rect: DOMRect): number {
    const viewportHeight = this.document.defaultView?.innerHeight || 0;
    const viewportWidth = this.document.defaultView?.innerWidth || 0;

    const left = Math.max(0, Math.min(rect.left, viewportWidth));
    const right = Math.min(viewportWidth, Math.max(rect.right, 0));
    const top = Math.max(0, Math.min(rect.top, viewportHeight));
    const bottom = Math.min(viewportHeight, Math.max(rect.bottom, 0));

    const width = right - left;
    const height = bottom - top;

    const area = width * height;
    const totalArea = rect.width * rect.height;

    return totalArea > 0 ? Math.round((area / totalArea) * 100) : 0;
  }
}
