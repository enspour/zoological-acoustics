import { Pipe, PipeTransform } from '@angular/core';

import { getOffset } from '../utils';

@Pipe({
  name: 'calculateOffset',
})
export class CalculateOffsetPipe implements PipeTransform {
  transform(startDate: string, endDate: string, columnWidth: number): number {
    return getOffset(startDate, endDate, columnWidth);
  }
}
