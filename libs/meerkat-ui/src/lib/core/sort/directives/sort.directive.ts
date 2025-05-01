import { Directive, input, model } from '@angular/core';

export interface MkSortConfig {
  by: string;
  order: 'asc' | 'desc';
}

@Directive({
  selector: '[mkSort]',
  exportAs: 'mkSort',
})
export class MkSortDirective<T> {
  public config = model<MkSortConfig | undefined>(undefined, {
    alias: 'mkSortConfig',
  });

  public sortFn = input<(arr: T[], config: MkSortConfig) => T[]>(undefined, {
    alias: 'mkSortFn',
  });

  public toggleOrder(by: string) {
    const config = this.config();

    if (!config || config.by !== by) {
      return this.config.set({ by, order: 'asc' });
    }

    switch (config.order) {
      case 'asc':
        return this.config.set({ by, order: 'desc' });
      case 'desc':
        return this.config.set(undefined);
    }
  }
}
