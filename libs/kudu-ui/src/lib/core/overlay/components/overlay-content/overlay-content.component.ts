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

import { FALLBACK_PLACEMENTS, LAYOUT_GETTER } from '../../constants';

import { KuduOverlayPlacement } from '../../interfaces';

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

  public placement = computed(() => this.getPlacement());
  public placementChange = outputFromObservable(toObservable(this.placement));

  public layout = computed(() => this.getLayout());

  private getLayout() {
    const origin = this.origin();
    const self = this.self();

    if (!origin || !self) {
      return new DOMRect();
    }

    const config = this.overlay.config();

    const { top, left } = LAYOUT_GETTER[this.placement()](origin, self, config);
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

  private getPlacement() {
    const origin = this.origin();
    const self = this.self();

    if (!origin || !self) {
      return this.overlay.config().placement;
    }

    const config = this.overlay.config();

    if (config.lockX && config.lockY) {
      return config.placement;
    }

    const initial = config.placement;

    let maxFitPercent = 0;
    let maxFitPlacement: KuduOverlayPlacement | null = null;

    const placements = [initial, ...FALLBACK_PLACEMENTS[initial]].filter(
      (placement) => this.isLock(placement),
    );

    for (const placement of placements) {
      const { top, left } = LAYOUT_GETTER[placement](origin, self, config);

      const rect = new DOMRect(left, top, self.width, self.height);
      const percent = this.getVisiblePercent(rect);

      if (percent === 100) {
        return placement;
      }

      if (maxFitPercent < percent) {
        maxFitPercent = percent;
        maxFitPlacement = placement;
      }
    }

    return maxFitPlacement || initial;
  }

  private isLock(placement: KuduOverlayPlacement) {
    const config = this.overlay.config();

    if (
      config.lockX &&
      ((config.placement.includes('left') && !placement.includes('left')) ||
        (config.placement.includes('right') && !placement.includes('right')))
    ) {
      return false;
    }

    if (
      config.lockY &&
      ((config.placement.includes('under') && !placement.includes('under')) ||
        (config.placement.includes('above') && !placement.includes('above')))
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
