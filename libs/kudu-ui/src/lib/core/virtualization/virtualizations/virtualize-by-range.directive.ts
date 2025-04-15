import { Directive, input } from '@angular/core';

import {
  KuduVirtualization,
  KuduVirtualizationConfig,
} from '../virtualization.interface';

import { kuduVirtualization } from '../virtualization.token';

@Directive({
  selector: '[kuduVirtualizeByRange]',
  providers: [
    {
      provide: kuduVirtualization,
      useExisting: KuduVirtualizeByRangeDirective,
      multi: true,
    },
  ],
})
export class KuduVirtualizeByRangeDirective<T>
  implements KuduVirtualization<T>
{
  public elementHeight = input.required<number>();

  public overScan = input<number>(5);

  public virtualize(items: T[], config: KuduVirtualizationConfig): T[] {
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
