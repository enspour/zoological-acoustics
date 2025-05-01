import { Pipe, PipeTransform } from '@angular/core';
import { MkDate } from '@meerkat-date';

@Pipe({
  name: 'isAvailable',
  standalone: true,
})
export class MkIsAvailablePipe implements PipeTransform {
  transform(date: MkDate, current: MkDate): boolean {
    return date.getMonth() === current.getMonth();
  }
}
