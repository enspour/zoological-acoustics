import { ElementRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export const resizeObservable = (elementRef: ElementRef) => {
  const observable = new Observable<ResizeObserverEntry>((observer) => {
    const resizer = new ResizeObserver((entries) => {
      observer.next(entries[0]);
    });

    resizer.observe(elementRef.nativeElement);
    return () => resizer.disconnect();
  });

  return toSignal(observable);
};
