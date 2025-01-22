import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

export const resizeObservable = (elementRef: ElementRef) => {
  return new Observable<ResizeObserverEntry>((observer) => {
    const resizer = new ResizeObserver((entries) => {
      observer.next(entries[0]);
    });

    resizer.observe(elementRef.nativeElement);
    return () => resizer.disconnect();
  });
};
