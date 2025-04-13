import { inject, Pipe, PipeTransform } from '@angular/core';

import {
  KuduSortConfig,
  KuduSortDirective,
} from '../directives/sort.directive';

@Pipe({
  name: 'kuduSort',
})
export class KuduSortPipe<T> implements PipeTransform {
  private sort = inject(KuduSortDirective);

  public transform(arr: T[], config?: KuduSortConfig): T[] {
    if (!config) {
      return arr;
    }

    return (this.sort.sortFn() || sortFnByDefault)(arr, config);
  }
}

const sortFnByDefault = <T>(arr: T[], config: KuduSortConfig): T[] => {
  const { order, by } = config;

  switch (order) {
    case 'asc':
      return sortByAsc(arr, by);
    case 'desc':
      return sortByDesc(arr, by);
  }
};

const sortByAsc = <T>(arr: T[], by: string) => {
  return [...arr].sort((a: any, b: any) =>
    a[by] < b[by] ? -1 : a[by] > b[by] ? 1 : 0,
  );
};

const sortByDesc = <T>(arr: T[], by: string) => {
  return [...arr].sort((a: any, b: any) =>
    a[by] > b[by] ? -1 : a[by] < b[by] ? 1 : 0,
  );
};
