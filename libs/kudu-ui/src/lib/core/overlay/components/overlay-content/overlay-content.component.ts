import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  model,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

import { layoutObservable } from '@kudu-ng-utils';

import { KuduClickOutsideDirective } from '../../../click-outside';
import { KuduZoneDirective } from '../../../zone';

import {
  KuduOverlayComponent,
  KuduOverlayPositionX,
  KuduOverlayPositionY,
} from '../overlay/overlay.component';

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
  hostDirectives: [
    KuduZoneDirective,
    {
      directive: KuduClickOutsideDirective,
      outputs: ['byClickOutside'],
    },
  ],
})
export class KuduOverlayContentComponent {
  private document = inject(DOCUMENT);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private overlay = inject(KuduOverlayComponent);

  public layout = toSignal(
    toObservable(this.overlay.origin).pipe(
      switchMap((origin) => layoutObservable(origin.elementRef)),
      switchMap((originLayout) => of(this.getLayout(originLayout))),
    ),
  );

  public positionX = model.required<KuduOverlayPositionX>();
  public positionY = model.required<KuduOverlayPositionY>();

  private getLayout(origin: DOMRect) {
    const { height, width } =
      this.elementRef.nativeElement.getBoundingClientRect();

    this.updatePositionX(origin, width);
    this.updatePositionY(origin, height);

    const positionX = this.positionX();
    const positionY = this.positionY();

    let top = origin.bottom;
    let left = origin.left;

    const config = this.overlay.config();

    if (positionX === 'right') {
      left = origin.right - width;
    }

    if (positionX === 'center') {
      left = origin.right - origin.width / 2 - width / 2;
    }

    if (positionX === 'left') {
      left = origin.left;
    }

    if (positionY === 'above') {
      top = origin.top - height - config.gap;
    }

    if (positionY === 'under') {
      top = origin.bottom + config.gap;
    }

    if (config.width === 'origin-width') {
      return { top, left, width: origin.width };
    }

    return { top, left, width };
  }

  private updatePositionX(origin: DOMRect, width: number) {
    if (this.overlay.config().lockX) {
      return;
    }

    const initialX = this.overlay.config().positionX;

    if (
      (initialX === 'left' && this.isPlacedInLeft(origin, width)) ||
      (initialX === 'center' && this.isPlacedInCenter(origin, width)) ||
      (initialX === 'right' && this.isPlacedInRight(origin, width))
    ) {
      return this.positionX.set(initialX);
    }

    if (this.isPlacedInCenter(origin, width)) {
      return this.positionX.set('center');
    }

    if (this.isPlacedInLeft(origin, width)) {
      this.positionX.set('left');
    }

    return this.positionX.set('right');
  }

  private updatePositionY(origin: DOMRect, height: number) {
    if (this.overlay.config().lockY) {
      return;
    }

    const initialY = this.overlay.config().positionY;

    if (
      (initialY === 'above' && this.isPlacedInAbove(origin, height)) ||
      (initialY === 'under' && this.isPlacedInUnder(origin, height))
    ) {
      return this.positionY.set(initialY);
    }

    if (this.isPlacedInAbove(origin, height)) {
      return this.positionY.set('above');
    }

    this.positionY.set('under');
  }

  private isPlacedInCenter(origin: DOMRect, width: number) {
    const viewportWidth = this.document.defaultView?.innerWidth || 0;
    return origin.left + origin.width / 2 + width / 2 <= viewportWidth;
  }

  private isPlacedInRight(origin: DOMRect, width: number) {
    return origin.right - width >= 0;
  }

  private isPlacedInLeft(origin: DOMRect, width: number) {
    const viewportWidth = this.document.defaultView?.innerWidth || 0;
    return origin.left + width <= viewportWidth;
  }

  private isPlacedInAbove(origin: DOMRect, height: number) {
    return origin.top - height >= 0;
  }

  private isPlacedInUnder(origin: DOMRect, height: number) {
    const viewportHeight = this.document.defaultView?.innerHeight || 0;
    return origin.top + height <= viewportHeight;
  }
}
