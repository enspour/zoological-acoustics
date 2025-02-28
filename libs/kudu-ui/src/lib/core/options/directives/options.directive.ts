import {
  computed,
  contentChildren,
  Directive,
  effect,
  input,
  model,
  output,
} from '@angular/core';

import { KuduOptionComponent } from '../components/option/option.component';

import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[kuduOptions]',
})
export class KuduOptionsDirective<T> {
  public options = contentChildren(KuduOptionComponent);

  public value = model<T | T[] | null>(null);
  public multiple = input<boolean>(false);

  public selected = computed(() =>
    this.options().filter((o) => o.isSelected()),
  );

  public bySelectedChange = outputFromObservable(toObservable(this.selected));
  public byOptionClick = output<KuduOptionComponent<T>>();

  constructor() {
    effect(() => {
      for (const option of this.options()) {
        const isSelected = this.isSelectedOption(option.value());
        option.isSelected.set(isSelected);
      }
    });

    effect((onCleanup) => {
      const subscriptions = this.options().map((option) =>
        option.byClick.subscribe(() => {
          this.selectOption(option.value());
          this.byOptionClick.emit(option);
        }),
      );

      onCleanup(() => subscriptions.forEach((s) => s.unsubscribe()));
    });
  }

  public selectOption(value: T) {
    if (this.multiple()) {
      const values = this.value();

      if (!Array.isArray(values)) {
        return this.value.set([value]);
      }

      const index = values.findIndex((v) => v === value);
      if (index === -1) {
        return this.value.set([...values, value]);
      }

      return this.value.set([
        ...values.slice(0, index),
        ...values.slice(index + 1),
      ]);
    }

    return this.value.set(value);
  }

  public isSelectedOption(value: T) {
    if (this.multiple()) {
      const values = this.value();

      if (!Array.isArray(values)) {
        return false;
      }

      return values.some((v) => v === value);
    }

    return this.value() === value;
  }

  public filterByInnerText(text: string) {
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
