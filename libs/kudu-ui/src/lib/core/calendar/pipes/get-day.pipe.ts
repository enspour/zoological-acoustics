import { Pipe, PipeTransform } from '@angular/core';

import { KuduDate } from '@kudu-date';

@Pipe({
  name: 'getDay',
  standalone: true,
})
export class KuduGetDayPipe implements PipeTransform {
  transform(date: KuduDate): number {
    return date.getDay();
  }
}
