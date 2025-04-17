import { Pipe, PipeTransform } from '@angular/core';

import { KuduDate } from '@kudu-date';

@Pipe({
  name: 'equals',
  standalone: true,
})
export class KuduEqualsPipe implements PipeTransform {
  transform(a: KuduDate, b: KuduDate): boolean {
    return a.toDateString() === b.toDateString();
  }
}
