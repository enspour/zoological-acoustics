import { Directive, input, model } from '@angular/core';

export interface KuduSortConfig {
  by: string;
  order: 'asc' | 'desc';
}

@Directive({
  selector: '[kuduSort]',
  exportAs: 'kuduSort',
})
export class KuduSortDirective<T> {
  public config = model<KuduSortConfig | undefined>(undefined, {
    alias: 'kuduSortConfig',
  });

  public sortFn = input<(arr: T[], config: KuduSortConfig) => T[]>(undefined, {
    alias: 'kuduSortFn',
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
