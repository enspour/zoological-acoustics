import { Pipe, PipeTransform } from '@angular/core';

export type KuduFindFn<T, Args extends unknown[]> =
  | ((value: T, index: number, ...args: Args) => value is T)
  | ((value: T, index: number, ...args: Args) => unknown);

@Pipe({
  name: 'find',
})
export class KuduFindPipe implements PipeTransform {
  public transform<T, Args extends unknown[]>(
    array: T[],
    findFn: KuduFindFn<T, Args>,
    ...args: Args
  ): T | undefined {
    return array.find((value, index) => findFn(value, index, ...args));
  }
}
