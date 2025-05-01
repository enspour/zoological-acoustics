import {
  contentChildren,
  Directive,
  effect,
  inject,
  model,
  output,
  untracked,
} from '@angular/core';

import { MkSelectionDirective } from '../../selection';

import { MkOptionComponent } from '../components/option/option.component';

export type MkOptionsValue<T> = T extends Array<infer I> ? I[] : T;

@Directive({
  selector: '[mkOptions]',
  hostDirectives: [MkSelectionDirective],
})
export class MkOptionsDirective<T, V extends MkOptionsValue<T>> {
  private selection = inject(MkSelectionDirective<V>);

  public options = contentChildren(MkOptionComponent<V>);

  public value = model.required<V>({ alias: 'mkOptionsValue' });

  public byClick = output<V>({ alias: 'mkOptionsByClick' });

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
      this.selection.select(value);
    } else {
      this.selection.reset(value);
    }

    this.byClick.emit(value);
  }

  public deselect(value: V) {
    if (Array.isArray(this.value())) {
      this.selection.deselect(value);
      this.byClick.emit(value);
    }
  }

  public toggle(value: V) {
    if (Array.isArray(this.value())) {
      this.selection.toggle(value);
    } else {
      this.selection.reset(value);
    }

    this.byClick.emit(value);
  }
}
