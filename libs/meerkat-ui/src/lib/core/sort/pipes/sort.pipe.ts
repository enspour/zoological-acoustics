import { inject, Pipe, PipeTransform } from '@angular/core';

import {
  MkSortConfig,
  MkSortDirective,
} from '../directives/sort.directive';

@Pipe({
  name: 'mkSort',
})
export class MkSortPipe implements PipeTransform {
  private sort = inject(MkSortDirective);

  public transform<T>(arr: T[], config?: MkSortConfig): T[] {
    if (!config) {
      return arr;
    }

    return (this.sort.sortFn() || sortFnByDefault)(arr, config);
  }
}

const sortFnByDefault = <T>(arr: T[], config: MkSortConfig): T[] => {
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
