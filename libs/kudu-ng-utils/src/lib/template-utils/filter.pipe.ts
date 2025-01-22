import { Pipe, PipeTransform } from '@angular/core';

export type KuduFilterFn<T, Args extends unknown[]> =
  | ((value: T, index: number, ...args: Args) => value is T)
  | ((value: T, index: number, ...args: Args) => unknown);

@Pipe({
  name: 'filter',
})
export class KuduFilterPipe implements PipeTransform {
  public transform<T, Args extends unknown[]>(
    array: T[],
    filterFn: KuduFilterFn<T, Args>,
    ...args: Args
  ): T[] {
    return array.filter((value, index) => filterFn(value, index, ...args));
  }
}
