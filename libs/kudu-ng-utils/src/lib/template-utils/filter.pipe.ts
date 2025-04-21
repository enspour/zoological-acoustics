import { Pipe, PipeTransform } from '@angular/core';

export type KuduFilterFn<T, Args extends unknown[]> = (
  ...args: Args
) =>
  | ((value: T, index: number, array: T[]) => value is T)
  | ((value: T, index: number, array: T[]) => unknown);

@Pipe({
  name: 'kuduFilter',
})
export class KuduFilterPipe implements PipeTransform {
  public transform<T, Args extends unknown[]>(
    array: T[],
    filterFn: KuduFilterFn<T, Args>,
    ...args: Args
  ): T[] {
    const fn = filterFn(...args);
    return array.filter((value, index, array) => fn(value, index, array));
  }
}
