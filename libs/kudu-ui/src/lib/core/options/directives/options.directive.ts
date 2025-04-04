import {
  AfterContentInit,
  computed,
  contentChildren,
  Directive,
  effect,
  inject,
  Injector,
  input,
  model,
  runInInjectionContext,
} from '@angular/core';

import { KuduOptionComponent } from '../components/option/option.component';

import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';

type Value<T, M extends boolean = false> = M extends any
  ? T
  : M extends true
    ? T[]
    : T;

@Directive({
  selector: '[kuduOptions]',
})
export class KuduOptionsDirective<T, M extends boolean = false>
  implements AfterContentInit
{
  private injector = inject(Injector);

  public options = contentChildren(KuduOptionComponent<T>);

  public value = model<Value<T, M>>();
  public multiple = input<M>(false as M);

  public selection = computed(() => this.Selection);
  public bySelectionChange = outputFromObservable(toObservable(this.selection));

  ngAfterContentInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        for (const option of this.options()) {
          const isSelected = this.isSelectedByValue(option.value());
          option.isSelected.set(isSelected);
        }
      });

      effect((onCleanup) => {
        const subscriptions = this.options().map((option) =>
          option.byClick.subscribe(() => this.selectByValue(option.value())),
        );

        onCleanup(() => subscriptions.forEach((s) => s.unsubscribe()));
      });
    });
  }

  public get Selection() {
    return this.options().filter((o) => o.isSelected());
  }

  public selectByValue(value: T) {
    if (this.multiple()) {
      const current = this.value();

      if (!Array.isArray(current)) {
        return this.value.set([value] as Value<T, M>);
      }

      const index = current.findIndex((v) => v === value);
      if (index === -1) {
        return this.value.set([...current, value] as Value<T, M>);
      }

      return this.value.set([
        ...current.slice(0, index),
        ...current.slice(index + 1),
      ] as Value<T, M>);
    }

    return this.value.set(value as Value<T, M>);
  }

  public isSelectedByValue(value: T) {
    const current = this.value();
    if (current === undefined) {
      return false;
    }

    if (this.multiple()) {
      return Array.isArray(current) ? current.some((v) => v === value) : false;
    }

    return current === value;
  }

  public filterByText(text: string) {
    const value = text.toLowerCase();

    for (const option of this.options()) {
      const text = option.elementRef.nativeElement.innerText.toLowerCase();

      if (text.includes(value)) {
        option.isHidden.set(false);
      } else {
        option.isHidden.set(true);
      }
    }
  }
}
