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

export const surroundedIntersectionObservable = (
  elementRef: ElementRef<HTMLElement>,
  elementRect: DOMRect,
) => {
  const root = document.documentElement;

  const rootMargin = [
    Math.floor(elementRect.top),
    Math.floor(root.clientWidth - elementRect.right),
    Math.floor(root.clientHeight - elementRect.bottom),
    Math.floor(elementRect.left),
  ]
    .map((value) => `${-1 * value}px`)
    .join(' ');

  return intersectionObservable(elementRef, {
    root: root.ownerDocument,
    rootMargin,
    threshold: [1],
  });
};
