import { computed, ElementRef, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

import { layoutObservable, resizeObservable } from '@meerkat-ng-web-apis';

import { MkOverlayFlexibleOriginDirective } from './directives/overlay-flexible-origin.directive';

import {
  MkOverlayFlexibleConfig,
  MkOverlayFlexiblePlacement,
} from './interfaces';

import { LAYOUT_CALCULATOR, PLACEMENT_FALLBACK } from './constants';

export class MkOverlayFlexiblePosition {
  private documentRect = this.getDocumentRect();
  private originRect = this.getOriginRect();
  private elementRect = this.getElementRect();

  public placement = this.getPlacement();
  public layout = this.getLayout();

  constructor(
    private document: Document,
    private config: Signal<Required<MkOverlayFlexibleConfig>>,
    private origin: Signal<MkOverlayFlexibleOriginDirective>,
    private element: ElementRef<HTMLElement>,
  ) {}

  private getDocumentRect() {
    return toSignal(
      resizeObservable({ nativeElement: this.document.documentElement }).pipe(
        map((entry) => entry.contentRect),
      ),
      { initialValue: createDocumentRect(this.document) },
    );
  }

  private getOriginRect() {
    const origin = this.origin;
    const originRect =
      origin().elementRef.nativeElement.getBoundingClientRect();

    return toSignal(
      toObservable(origin).pipe(
        switchMap((origin) => layoutObservable(origin.elementRef)),
      ),
      { initialValue: originRect },
    );
  }

  private getElementRect() {
    return computed(() => {
      const config = this.config();
      const originRect = this.originRect();

      const rect = this.element.nativeElement.getBoundingClientRect();

      if (config.width === 'origin-width') {
        rect.width = originRect.width;
      }

      return rect;
    });
  }

  private getPlacement() {
    return computed(() => {
      const config = this.config();

      if (config.lockX && config.lockY) {
        return config.placement;
      }

      const initial = config.placement;

      let maxFitPercent = 0;
      let maxFitPlacement: MkOverlayFlexiblePlacement | null = null;

      const placements = [initial, ...PLACEMENT_FALLBACK[initial]].filter(
        (placement) => this.isLock(placement),
      );

      for (const placement of placements) {
        const rect = LAYOUT_CALCULATOR[placement](
          this.originRect(),
          this.elementRect(),
          config,
        );

        const percent = getIntersectionPercentage(rect, this.documentRect());

        if (percent === 100) {
          return placement;
        }

        if (maxFitPercent < percent) {
          maxFitPercent = percent;
          maxFitPlacement = placement;
        }
      }

      return maxFitPlacement || initial;
    });
  }

  private isLock(placement: MkOverlayFlexiblePlacement) {
    const config = this.config();

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

  private getLayout() {
    return computed(() => {
      return LAYOUT_CALCULATOR[this.placement()](
        this.originRect(),
        this.elementRect(),
        this.config(),
      );
    });
  }
}

const getIntersectionPercentage = (
  elementRect: DOMRect,
  containerRect: DOMRect,
): number => {
  if (
    elementRect.width <= 0 ||
    elementRect.height <= 0 ||
    containerRect.width <= 0 ||
    containerRect.height <= 0
  ) {
    return 0;
  }

  const visibleLeft = Math.max(elementRect.left, containerRect.left);
  const visibleRight = Math.min(elementRect.right, containerRect.right);
  const visibleTop = Math.max(elementRect.top, containerRect.top);
  const visibleBottom = Math.min(elementRect.bottom, containerRect.bottom);

  const visibleWidth = Math.max(0, visibleRight - visibleLeft);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);

  const visibleArea = visibleWidth * visibleHeight;
  const elementArea = elementRect.width * elementRect.height;

  return elementArea > 0 ? Math.round((visibleArea / elementArea) * 100) : 0;
};

const createDocumentRect = (document: Document) => {
  const height = document.defaultView?.innerHeight || 0;
  const width = document.defaultView?.innerWidth || 0;
  return new DOMRect(0, 0, width, height);
};
