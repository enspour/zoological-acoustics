import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { intersectionObservable } from '@kudu-ng-utils';

type Options = IntersectionObserverInit | undefined;

@Directive({
  selector: '[kuduIntersection]',
})
export class KuduIntersectionDirective {
  private elementRef = inject(ElementRef);

  public kuduIntersectionOptions = input<Options>(undefined);
  public kuduIntersection = output<IntersectionObserverEntry>();

  private intersectionObserver = toSignal(
    toObservable(this.kuduIntersectionOptions).pipe(
      switchMap(() =>
        intersectionObservable(this.elementRef, this.kuduIntersectionOptions()),
      ),
    ),
  );

  constructor() {
    effect(() => {
      const entry = this.intersectionObserver();
      if (entry) {
        this.kuduIntersection.emit(entry);
      }
    });
  }
}
