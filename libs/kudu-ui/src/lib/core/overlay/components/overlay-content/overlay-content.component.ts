import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  model,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

import { layoutObservable } from '@kudu-ng-utils';

import { KuduClickOutsideDirective } from '../../../click-outside';

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

  @HostListener('byClickOutside')
  public onClickOutside() {
    this.overlay.isOpen.set(false);
  }

  private getLayout(origin: DOMRect) {
    const { height, width } =
      this.elementRef.nativeElement.getBoundingClientRect();

    let top = origin.bottom;
    let left = origin.left;

    this.updatePositionX(left, width);
    this.updatePositionY(top, height);

    const positionX = this.positionX();
    const positionY = this.positionY();

    if (positionX === 'right') {
      left = origin.left;
    }

    if (positionX === 'center') {
      left = origin.right - origin.width / 2 - width / 2;
    }

    if (positionX === 'left') {
      left = origin.right - width;
    }

    if (positionY === 'above') {
      top = origin.top - height;
    }

    if (positionY === 'under') {
      top = origin.bottom;
    }

    const config = this.overlay.config();

    if (config.width === 'origin-width') {
      return { top, left, width: origin.width };
    }

    return { top, left, width };
  }

  private updatePositionX(left: number, width: number) {
    if (this.overlay.config().lockX) {
      return;
    }

    const initialX = this.overlay.config().positionX;

    if (
      (initialX === 'center' && this.isPlacedInCenter(left, width)) ||
      (initialX === 'right' && this.isPlacedInRight(left, width)) ||
      (initialX === 'left' && this.isPlacedInLeft(left, width))
    ) {
      return this.positionX.set(initialX);
    }

    if (this.isPlacedInCenter(left, width)) {
      return this.positionX.set('center');
    }

    if (this.isPlacedInRight(left, width)) {
      return this.positionX.set('right');
    }

    this.positionX.set('left');
  }

  private updatePositionY(top: number, height: number) {
    if (this.overlay.config().lockY) {
      return;
    }

    const initialY = this.overlay.config().positionY;

    if (
      (initialY === 'above' && this.isPlacedInAbove(top, height)) ||
      (initialY === 'under' && this.isPlacedInUnder(top, height))
    ) {
      return this.positionY.set(initialY);
    }

    if (this.isPlacedInAbove(top, height)) {
      return this.positionY.set('above');
    }

    this.positionY.set('under');
  }

  private isPlacedInCenter(left: number, width: number) {
    const viewportWidth = this.document.defaultView?.innerWidth || 0;
    return left + width / 2 <= viewportWidth;
  }

  private isPlacedInRight(left: number, width: number) {
    const viewportWidth = this.document.defaultView?.innerWidth || 0;
    return left + width <= viewportWidth;
  }

  private isPlacedInLeft(left: number, width: number) {
    return left - width >= 0;
  }

  private isPlacedInAbove(top: number, height: number) {
    return top - height >= 0;
  }

  private isPlacedInUnder(top: number, height: number) {
    const viewportHeight = this.document.defaultView?.innerHeight || 0;
    return top + height <= viewportHeight;
  }
}
