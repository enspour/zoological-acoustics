import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from '@kudu-date';

@Pipe({
  name: 'isToday',
  standalone: true,
})
export class KuduIsTodayPipe implements PipeTransform {
  transform(date: DateTime): boolean {
    return date.toDateString() === DateTime.now().toDateString();
  }
}
