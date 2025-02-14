import { ElementRef } from '@angular/core';
import {
  distinctUntilChanged,
  Observable,
  Subscriber,
  Subscription,
} from 'rxjs';

import { surroundedIntersectionObservable } from './intersection-observable.util';
import { resizeObservable } from './resize-observable.util';

const compareDOMRect = (a: DOMRect, b: DOMRect) => {
  return (
    a.width === b.width && a.height === b.height && a.x === b.x && a.y === b.y
  );
};

export const layoutObservable = (elementRef: ElementRef<HTMLElement>) => {
  return new Observable<DOMRect>((observer) => {
    const disconnectByIntersection = byIntersection(elementRef, observer);
    const disconnectByResize = byResizeElement(elementRef, observer);
    const disconnectByDocument = byResizeDocument(elementRef, observer);
    const disconnectByScroll = byScroll(elementRef, observer);

    return () => {
      disconnectByIntersection();
      disconnectByResize();
      disconnectByDocument();
      disconnectByScroll();
    };
  }).pipe(distinctUntilChanged(compareDOMRect));
};

const byIntersection = (
  elementRef: ElementRef<HTMLElement>,
  observer: Subscriber<DOMRect>,
) => {
  let subscription: Subscription | null = null;

  const refresh = () => {
    subscription?.unsubscribe();

    const elementRect = elementRef.nativeElement.getBoundingClientRect();

    observer.next(elementRect);

    const observable = surroundedIntersectionObservable(
      elementRef,
      elementRect,
    );

    subscription = observable.subscribe((entry) => {
      if (entry.intersectionRatio < 1) {
        refresh();
      }
    });
  };

  refresh();

  return () => subscription?.unsubscribe();
};

const byResizeElement = (
  elementRef: ElementRef<HTMLElement>,
  observer: Subscriber<DOMRect>,
) => {
  const observable = resizeObservable(elementRef);

  const subscription = observable.subscribe(() => {
    const elementRect = elementRef.nativeElement.getBoundingClientRect();
    observer.next(elementRect);
  });

  return () => subscription.unsubscribe();
};

const byResizeDocument = (
  elementRef: ElementRef<HTMLElement>,
  observer: Subscriber<DOMRect>,
) => {
  const observable = resizeObservable({
    nativeElement: document.documentElement,
  });

  const subscription = observable.subscribe(() => {
    const elementRect = elementRef.nativeElement.getBoundingClientRect();
    observer.next(elementRect);
  });

  return () => subscription.unsubscribe();
};

const byScroll = (
  elementRef: ElementRef<HTMLElement>,
  observer: Subscriber<DOMRect>,
) => {
  const parents: HTMLElement[] = [];

  let parent = elementRef.nativeElement.parentElement;

  while (parent) {
    if (parent.scrollHeight > parent.clientHeight) {
      parents.push(parent);
    }

    parent = parent.parentElement;
  }

  const onScroll = () => {
    observer.next(elementRef.nativeElement.getBoundingClientRect());
  };

  parents.forEach((p) =>
    p.addEventListener('scroll', onScroll, { passive: true }),
  );

  return () => {
    parents.forEach((p) => p.removeEventListener('scroll', onScroll));
  };
};
