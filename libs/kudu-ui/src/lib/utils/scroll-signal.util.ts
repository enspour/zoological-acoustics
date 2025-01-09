import { ElementRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map, startWith } from 'rxjs';

export const scrollSignal = (elementRef: ElementRef) => {
  return toSignal(
    fromEvent(elementRef.nativeElement, 'scroll').pipe(
      startWith(elementRef.nativeElement.scrollTop),
      map(() => elementRef.nativeElement.scrollTop),
    ),
  );
};
