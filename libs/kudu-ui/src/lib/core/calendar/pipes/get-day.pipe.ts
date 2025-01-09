import { Pipe, PipeTransform } from '@angular/core';

import { DateTime } from '@kudu-date';

@Pipe({
  name: 'getDay',
  standalone: true,
})
export class KuduGetDayPipe implements PipeTransform {
  transform(date: DateTime): number {
    return date.getDay();
  }
}
