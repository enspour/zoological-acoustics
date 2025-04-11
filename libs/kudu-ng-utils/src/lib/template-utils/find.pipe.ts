import { Pipe, PipeTransform } from '@angular/core';

export type KuduFindFn<T, Args extends unknown[]> = (
  ...args: Args
) =>
  | ((value: T, index: number, array: T[]) => value is T)
  | ((value: T, index: number, array: T[]) => unknown);

@Pipe({
  name: 'find',
})
export class KuduFindPipe implements PipeTransform {
  public transform<T, Args extends unknown[]>(
    array: T[],
    findFn: KuduFindFn<T, Args>,
    ...args: Args
  ): T | undefined {
    const fn = findFn(...args);
    return array.find((value, index, array) => fn(value, index, array));
  }
}
