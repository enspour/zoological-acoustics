import { DOCUMENT } from '@angular/common';
import { ElementRef, inject, Injectable } from '@angular/core';
import {
  fromEvent,
  map,
  Observable,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';

import { clamp } from '@kudu-utils';

export interface KuduColorPoint {
  x: number;
  y: number;
}

@Injectable()
export class KuduColorPointService extends Observable<KuduColorPoint> {
  private document = inject(DOCUMENT);

  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private element = this.elementRef.nativeElement;

  private mousedown$ = fromEvent<MouseEvent>(this.element, 'mousedown');
  private mousemove$ = fromEvent<MouseEvent>(this.document, 'mousemove');
  private mouseup$ = fromEvent<MouseEvent>(this.document, 'mouseup');

  public point$ = this.mousedown$.pipe(
    switchMap((event) => {
      return this.mousemove$.pipe(
        map((event) => this.getElementPoint(event)),
        startWith(this.getElementPoint(event)),
        takeUntil(this.mouseup$),
      );
    }),
  );

  constructor() {
    super((subscriber) => this.point$.subscribe(subscriber));
  }

  private getElementPoint(event: MouseEvent) {
    const { clientX, clientY } = event;

    const { left, top, width, height } =
      this.elementRef.nativeElement.getBoundingClientRect();

    return {
      x: clamp(clientX - left, 0, width) / width,
      y: clamp(clientY - top, 0, height) / height,
    };
  }
}
