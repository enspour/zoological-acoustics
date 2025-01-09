import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';

import { intersectionObservable } from '../../utils';

type Options = IntersectionObserverInit | undefined;

@Directive({
  selector: '[kuduIntersection]',
})
export class KuduIntersectionDirective {
  private elementRef = inject(ElementRef);

  public kuduIntersectionOptions = input<Options>(undefined);
  public kuduIntersection = output<IntersectionObserverEntry>();

  private intersectionObserver = computed(() =>
    intersectionObservable(this.elementRef, this.kuduIntersectionOptions()),
  );

  constructor() {
    effect(() => {
      const entry = this.intersectionObserver()();
      if (entry) {
        this.kuduIntersection.emit(entry);
      }
    });
  }
}
