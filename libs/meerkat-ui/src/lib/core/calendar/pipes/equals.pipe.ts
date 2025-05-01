import { Pipe, PipeTransform } from '@angular/core';

import { MkDate } from '@meerkat-date';

@Pipe({
  name: 'equals',
  standalone: true,
})
export class MkEqualsPipe implements PipeTransform {
  transform(a: MkDate, b: MkDate): boolean {
    return a.toDateString() === b.toDateString();
  }
}
