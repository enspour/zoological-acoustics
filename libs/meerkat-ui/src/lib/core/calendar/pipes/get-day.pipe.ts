import { Pipe, PipeTransform } from '@angular/core';

import { MkDate } from '@meerkat-date';

@Pipe({
  name: 'getDay',
  standalone: true,
})
export class MkGetDayPipe implements PipeTransform {
  transform(date: MkDate): number {
    return date.getDay();
  }
}
