import { Pipe, PipeTransform } from '@angular/core';
import { KuduDate } from '@kudu-date';

@Pipe({
  name: 'isToday',
  standalone: true,
})
export class KuduIsTodayPipe implements PipeTransform {
  transform(date: KuduDate): boolean {
    return date.toDateString() === KuduDate.now().toDateString();
  }
}
