import { computed, ElementRef } from '@angular/core';

import { resizeObservable } from './resize-observable.util';

export const heightSignal = (elementRef: ElementRef) => {
  const entry = resizeObservable(elementRef);
  return computed(() => entry()?.contentRect.height);
};
