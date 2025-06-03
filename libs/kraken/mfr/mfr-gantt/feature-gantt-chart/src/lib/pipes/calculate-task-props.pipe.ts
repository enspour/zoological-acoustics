import { Pipe, PipeTransform } from '@angular/core';

import { Task } from '@kraken/domain';

import { GanttPeriod } from '@kraken/mfr-data-access-gantt';

import { getOffset } from '../utils';

@Pipe({
  name: 'calculateTaskProps',
})
export class CalculateTaskPropsPipe implements PipeTransform {
  transform(task: Task, period: GanttPeriod, columnWidth: number) {
    const left = getOffset(period.startDate, task.startDate, columnWidth);
    const width = getOffset(task.startDate, task.endDate, columnWidth);

    return { left, width };
  }
}
