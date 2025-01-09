import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from '@kudu-date';

@Pipe({
  name: 'isAvailable',
  standalone: true,
})
export class KuduIsAvailablePipe implements PipeTransform {
  transform(date: DateTime, current: DateTime): boolean {
    return date.getMonth() === current.getMonth();
  }
}
