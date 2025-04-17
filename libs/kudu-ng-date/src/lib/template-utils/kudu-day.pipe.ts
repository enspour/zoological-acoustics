import { Pipe, PipeTransform } from '@angular/core';

import { KuduDate } from '@kudu-date';

@Pipe({
  name: 'kuduDay',
})
export class KuduDayPipe implements PipeTransform {
  transform(date: KuduDate): number {
    return date.getDay();
  }
}
