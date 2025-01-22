import { computed, inject, Injectable } from '@angular/core';

import { GanttService } from './gantt.service';

import { GanttRow } from './interfaces';

@Injectable()
export class GanttChartService {
  private ganttService = inject(GanttService);

  public rows = computed<GanttRow[]>(() => this.getRows());

  private getRows() {
    return this.ganttService.tasks().map(
      (task, index) =>
        ({
          type: 'task',
          task,
          index,
        }) as const,
    );
  }
}
