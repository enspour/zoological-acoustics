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
import { map, switchMap } from 'rxjs';

import { layoutObservable, resizeObservable } from '@meerkat-ng-web-apis';

import { MkZoneDirective } from '../../../zone';

import { MkOverlayComponent } from '../overlay/overlay.component';

import { FALLBACK_PLACEMENTS, POSITION_GETTER } from '../../constants';

import { MkOverlayPlacement } from '../../interfaces';

const createDocumentRect = (document: Document) => {
  const height = document.defaultView?.innerHeight || 0;
  const width = document.defaultView?.innerWidth || 0;
  return new DOMRect(0, 0, width, height);
};

@Component({
  selector: 'mk-overlay-container',
  imports: [],
  templateUrl: './overlay-container.component.html',
  styleUrl: './overlay-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.top.px]': 'layout().top',
    '[style.left.px]': 'layout().left',
    '[style.width.px]': 'layout().width',
  },
  hostDirectives: [MkZoneDirective],
})
export class MkOverlayContainerComponent {
  private document = inject(DOCUMENT);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private overlay = inject(MkOverlayComponent);

  private documentRect = toSignal(
    resizeObservable({ nativeElement: this.document.documentElement }).pipe(
      map((entry) => entry.contentRect),
    ),
    { initialValue: createDocumentRect(this.document) },
  );

  private originRect = toSignal(
    toObservable(this.overlay.origin).pipe(
      switchMap((origin) => layoutObservable(origin.elementRef)),
    ),
    {
      initialValue: this.overlay
        .origin()
        .elementRef.nativeElement.getBoundingClientRect(),
    },
  );

  private elementRect = computed(() => this.getElementRect());

  public placement = computed(() => this.getPlacement());
  public placementChange = outputFromObservable(toObservable(this.placement));

  public layout = computed(() => this.getLayout());

  private getElementRect() {
    const origin = this.originRect();

    const config = this.overlay.config();

    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    rect.width = config.width === 'origin-width' ? origin.width : rect.width;

    return rect;
  }

  private getPlacement() {
    const originRect = this.originRect();
    const elementRect = this.elementRect();

    const config = this.overlay.config();

    if (config.lockX && config.lockY) {
      return config.placement;
    }

    const initial = config.placement;

    let maxFitPercent = 0;
    let maxFitPlacement: MkOverlayPlacement | null = null;

    const placements = [initial, ...FALLBACK_PLACEMENTS[initial]].filter(
      (placement) => this.isLock(placement),
    );

    for (const placement of placements) {
      const { top, left } = POSITION_GETTER[placement](
        originRect,
        elementRect,
        config,
      );

      const rect = new DOMRect(
        left,
        top,
        elementRect.width,
        elementRect.height,
      );

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

  private getLayout() {
    const originRect = this.originRect();
    const elementRect = this.elementRect();

    const config = this.overlay.config();

    const { top, left } = POSITION_GETTER[this.placement()](
      originRect,
      elementRect,
      config,
    );

    return new DOMRect(left, top, elementRect.width, elementRect.height);
  }

  private isLock(placement: MkOverlayPlacement) {
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

  private getVisiblePercent(rect: DOMRect): number {
    const viewportHeight = this.documentRect().height;
    const viewportWidth = this.documentRect().width;

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
