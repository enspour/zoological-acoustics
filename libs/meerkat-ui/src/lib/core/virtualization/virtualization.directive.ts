import { computed, Directive, ElementRef, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

import { resizeObservable, scrollObservable } from '@meerkat-ng-web-apis';

import {
  MkVirtualization,
  MkVirtualizationConfig,
} from './virtualization.interface';

import { mkVirtualization } from './virtualization.token';

export interface MkByVirtualization<T> {
  items: T[];
  config: MkVirtualizationConfig;
}

@Directive({
  selector: '[mkVirtualization]',
  exportAs: 'mkVirtualization',
})
export class MkVirtualizationDirective<T> {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private virtualizations = inject<MkVirtualization<T>[]>(mkVirtualization, {
    optional: true,
    self: true,
  });

  public viewport = input(this.elementRef);

  public elements = input.required<T[]>();
  public elementsToRender = computed(() => this.getElementsToRender());

  public viewportLayout = toSignal(
    toObservable(this.viewport).pipe(
      switchMap((viewport) => resizeObservable(viewport)),
      map((entry) => entry.contentRect),
    ),
  );

  public viewportScroll = toSignal(
    toObservable(this.viewport).pipe(
      switchMap((viewport) => scrollObservable(viewport)),
    ),
  );

  public getElementsToRender() {
    const config = {
      layout: this.viewportLayout(),
      scroll: this.viewportScroll(),
    };

    return (
      this.virtualizations?.reduce((acc, virtualization) => {
        return virtualization.virtualize(acc, config);
      }, this.elements()) || []
    );
  }
}
