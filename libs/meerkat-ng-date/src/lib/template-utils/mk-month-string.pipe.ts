import { Pipe, PipeTransform } from '@angular/core';

import { MkDate } from '@meerkat-date';

@Pipe({
  name: 'mkMonthString',
})
export class MkMonthStringPipe implements PipeTransform {
  transform(date: MkDate): string {
    return date.getMonthString();
  }
}
