import { ElementRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export const intersectionObservable = (
  elementRef: ElementRef,
  options?: IntersectionObserverInit,
) => {
  const observable = new Observable<IntersectionObserverEntry>((observer) => {
    const intersection = new IntersectionObserver((entries) => {
      observer.next(entries[0]);
    }, options);

    intersection.observe(elementRef.nativeElement);
    return () => intersection.disconnect();
  });

  return toSignal(observable);
};
