import { Pipe, PipeTransform } from '@angular/core';

import { DateTime } from '@kudu-date';

@Pipe({
  name: 'equals',
  standalone: true,
})
export class KuduEqualsPipe implements PipeTransform {
  transform(a: DateTime, b: DateTime): boolean {
    return a.toDateString() === b.toDateString();
  }
}
