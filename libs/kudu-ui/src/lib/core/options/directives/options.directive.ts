import {
  contentChildren,
  Directive,
  effect,
  inject,
  model,
  untracked,
} from '@angular/core';

import { KuduSelectionDirective } from '../../selection';

import { KuduOptionComponent } from '../components/option/option.component';

export type KuduOptionsValue<T> = T extends Array<infer I> ? I[] : T;

@Directive({
  selector: '[kuduOptions]',
  hostDirectives: [KuduSelectionDirective],
})
export class KuduOptionsDirective<T, V extends KuduOptionsValue<T>> {
  private selection = inject(KuduSelectionDirective<V>);

  public options = contentChildren(KuduOptionComponent<V>);

  public value = model.required<V>({
    alias: 'kuduOptionsValue',
  });

  constructor() {
    effect(() => {
      const value = this.value();

      untracked(() => {
        if (Array.isArray(value)) {
          this.selection.reset(...value);
        } else {
          this.selection.reset(value);
        }
      });
    });

    effect(() => {
      const selection = this.selection.selection();

      untracked(() => {
        if (Array.isArray(this.value())) {
          this.value.set([...selection] as V);
        } else {
          this.value.set([...selection].at(0)!);
        }
      });
    });
  }

  public isSelected(value: V) {
    return this.selection.isSelected(value);
  }

  public select(value: V) {
    if (Array.isArray(this.value())) {
      return this.selection.select(value);
    }

    this.selection.reset(value);
  }

  public deselect(value: V) {
    if (Array.isArray(this.value())) {
      this.selection.deselect(value);
    }
  }

  public toggle(value: V) {
    if (Array.isArray(this.value())) {
      return this.selection.toggle(value);
    }

    this.selection.reset(value);
  }
}
