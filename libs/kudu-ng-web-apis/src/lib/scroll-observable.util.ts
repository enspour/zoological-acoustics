import { ElementRef } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';

export const scrollObservable = (elementRef: ElementRef<HTMLElement>) => {
  return fromEvent(elementRef.nativeElement, 'scroll').pipe(
    startWith({
      top: elementRef.nativeElement.scrollTop,
      left: elementRef.nativeElement.scrollLeft,
    }),
    map(() => ({
      top: elementRef.nativeElement.scrollTop,
      left: elementRef.nativeElement.scrollLeft,
    })),
  );
};
