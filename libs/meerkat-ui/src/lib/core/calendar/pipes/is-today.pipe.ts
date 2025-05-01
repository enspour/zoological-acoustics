import { Pipe, PipeTransform } from '@angular/core';
import { MkDate } from '@meerkat-date';

@Pipe({
  name: 'isToday',
  standalone: true,
})
export class MkIsTodayPipe implements PipeTransform {
  transform(date: MkDate): boolean {
    return date.toDateString() === MkDate.now().toDateString();
  }
}
