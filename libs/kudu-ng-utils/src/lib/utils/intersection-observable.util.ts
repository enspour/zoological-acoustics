import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

export const intersectionObservable = (
  elementRef: ElementRef,
  options?: IntersectionObserverInit,
) => {
  return new Observable<IntersectionObserverEntry>((observer) => {
    const intersection = new IntersectionObserver((entries) => {
      observer.next(entries[0]);
    }, options);

    intersection.observe(elementRef.nativeElement);
    return () => intersection.disconnect();
  });
};
