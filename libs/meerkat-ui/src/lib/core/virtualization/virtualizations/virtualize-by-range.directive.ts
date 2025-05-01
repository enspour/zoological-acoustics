import { Directive, input } from '@angular/core';

import {
  MkVirtualization,
  MkVirtualizationConfig,
} from '../virtualization.interface';

import { mkVirtualization } from '../virtualization.token';

@Directive({
  selector: '[mkVirtualizeByRange]',
  providers: [
    {
      provide: mkVirtualization,
      useExisting: MkVirtualizeByRangeDirective,
      multi: true,
    },
  ],
})
export class MkVirtualizeByRangeDirective<T>
  implements MkVirtualization<T>
{
  public elementHeight = input.required<number>();

  public overScan = input<number>(5);

  public virtualize(items: T[], config: MkVirtualizationConfig): T[] {
    const height = config.layout?.height;
    const scroll = config.scroll?.top;

    if (typeof height === 'undefined' || typeof scroll === 'undefined') {
      return [];
    }

    const start = scroll;
    const end = scroll + height;

    let startIndex = Math.floor(start / this.elementHeight()) - this.overScan();
    let endIndex = Math.ceil(end / this.elementHeight()) + this.overScan();

    startIndex = Math.max(0, startIndex);
    endIndex = Math.min(items.length - 1, endIndex);

    return items.slice(startIndex, endIndex + 1);
  }
}
