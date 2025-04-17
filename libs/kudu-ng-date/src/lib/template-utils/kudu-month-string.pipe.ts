import { Pipe, PipeTransform } from '@angular/core';

import { KuduDate } from '@kudu-date';

@Pipe({
  name: 'kuduMonthString',
})
export class KuduMonthStringPipe implements PipeTransform {
  transform(date: KuduDate): string {
    return date.getMonthString();
  }
}
