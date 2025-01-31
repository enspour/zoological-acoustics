import { computed, inject, Injectable } from '@angular/core';

import { EmployeesService } from '@kudu/mfr-data-access-employees';

import { groupTasksByRows } from '@kudu/mfr-util-gantt-chart';
import { groupTasks } from '@kudu/mfr-util-tasks';

import { GanttToolbarService } from './gantt-toolbar.service';
import { GanttService } from './gantt.service';

import { GanttRow } from './interfaces';

@Injectable()
export class GanttChartService {
  private employeesService = inject(EmployeesService);

  private ganttService = inject(GanttService);
  private ganttToolbarService = inject(GanttToolbarService);

  public rows = computed<GanttRow[]>(() => this.getRows());

  private getRows() {
    const grouping = this.ganttToolbarService.grouping();

    if (grouping === 'tasks') {
      return this.groupByTasks();
    }

    if (grouping === 'executors') {
      return this.groupByExecutors();
    }

    return [];
  }

  private groupByTasks() {
    const tasks = this.ganttService.tasks();

    return tasks.map((task, index) => {
      return {
        type: 'task',
        task,
        index,
      } satisfies GanttRow;
    });
  }

  private groupByExecutors() {
    const tasks = this.ganttService.tasks();

    const employees = this.employeesService.employees() || [];

    const groupedTasksByExecutors = groupTasks(tasks, 'executorUuids');

    let index = 0;

    return employees.flatMap((employee) => {
      const tasksByExecutor = groupedTasksByExecutors[employee.uuid] || [];
      const tasksByRows = groupTasksByRows(tasksByExecutor);

      return tasksByRows.map(
        (tasks, i) =>
          ({
            type: 'executor',
            executor: employee,
            tasks,
            index: index++,
            isFirst: i === 0,
            isLast: i === tasksByRows.length - 1,
          }) satisfies GanttRow,
      );
    });
  }
}
