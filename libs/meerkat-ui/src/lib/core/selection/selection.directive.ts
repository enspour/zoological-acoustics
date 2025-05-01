import { Directive, model } from '@angular/core';

@Directive({
  selector: '[mkSelection]',
  exportAs: 'mkSelection',
})
export class MkSelectionDirective<T> {
  public selection = model<Set<T>>(new Set<T>(), {
    alias: 'mkSelection',
  });

  public get length() {
    return this.selection().size;
  }

  public get selected() {
    return [...this.selection()];
  }

  public isSelected(value: T) {
    return this.selection().has(value);
  }

  public select(...values: T[]) {
    if (values.every((value) => this.isSelected(value))) {
      return;
    }

    this.selection.update((selection) => {
      const set = new Set(selection);
      values.forEach((value) => set.add(value));

      return set;
    });
  }

  public deselect(...values: T[]) {
    if (!values.some((value) => this.isSelected(value))) {
      return;
    }

    this.selection.update((selection) => {
      const set = new Set(selection);
      values.forEach((value) => set.delete(value));

      return set;
    });
  }

  public toggle(...values: T[]) {
    for (const value of values) {
      if (this.isSelected(value)) {
        this.deselect(value);
      } else {
        this.select(value);
      }
    }
  }

  public reset(...values: T[]) {
    if (
      this.length === values.length &&
      values.every((value) => this.isSelected(value))
    ) {
      return;
    }

    this.selection.set(new Set(values));
  }

  public clear() {
    if (this.length === 0) {
      return;
    }

    this.selection.set(new Set());
  }
}
