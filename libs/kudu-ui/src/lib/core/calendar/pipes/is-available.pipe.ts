import { Pipe, PipeTransform } from '@angular/core';
import { KuduDate } from '@kudu-date';

@Pipe({
  name: 'isAvailable',
  standalone: true,
})
export class KuduIsAvailablePipe implements PipeTransform {
  transform(date: KuduDate, current: KuduDate): boolean {
    return date.getMonth() === current.getMonth();
  }
}
