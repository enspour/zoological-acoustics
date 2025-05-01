import { Pipe, PipeTransform } from '@angular/core';

import { MkDate } from '@meerkat-date';

@Pipe({
  name: 'mkDay',
})
export class MkDayPipe implements PipeTransform {
  transform(date: MkDate): number {
    return date.getDay();
  }
}
