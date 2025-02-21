import { computed, inject, Injectable } from '@angular/core';

import { Employee, Task, TaskBoard } from '@kudu/domain';

import { EmployeesService } from '@kudu/mfr-data-access-employees';
import {
  ProjectTaskBoardsService,
  ProjectTasksService,
} from '@kudu/mfr-data-access-project';

import { groupTasksByRows } from '@kudu/mfr-util-gantt-chart';
import { groupTasks } from '@kudu/mfr-util-tasks';

import { GanttToolbarService } from './gantt-toolbar.service';

import { GanttRow } from './interfaces';

@Injectable()
export class GanttRowsService {
  private employeesService = inject(EmployeesService);
  private projectTaskBoardsService = inject(ProjectTaskBoardsService);
  private projectTasksService = inject(ProjectTasksService);

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
    const boards = this.projectTaskBoardsService.boards() || [];

    const tasks = this.projectTasksService.tasks() || [];
    const tasksByBoard = groupTasks(tasks, 'boardUuid');

    const rows: GanttRow[] = [];

    for (const board of boards) {
      this.appendBoard(rows, { board });

      const tasks = tasksByBoard[board.uuid] || [];
      this.appendBoardTasks(rows, { tasks });
    }

    return rows;
  }

  private groupByExecutors() {
    const boards = this.projectTaskBoardsService.boards() || [];

    const employees = this.employeesService.employees() || [];

    const tasks = this.projectTasksService.tasks() || [];
    const tasksByExecutors = groupTasks(tasks, 'executorUuids');

    const rows: GanttRow[] = [];

    for (const board of boards) {
      this.appendBoard(rows, { board });

      for (const employee of employees) {
        const tasksByExecutor = tasksByExecutors[employee.uuid] || [];
        const tasksByRows = groupTasksByRows(tasksByExecutor);

        this.appendEmployee(rows, { employee, tasksByRows });
      }
    }

    return rows;
  }

  private appendBoard(rows: GanttRow[], context: { board: TaskBoard }) {
    rows.push({
      type: 'board',
      board: context.board,
      index: rows.length,
    });
  }

  private appendBoardTasks(rows: GanttRow[], context: { tasks: Task[] }) {
    for (const task of context.tasks) {
      rows.push({
        type: 'task',
        task,
        index: rows.length,
      });
    }
  }

  private appendEmployee(
    rows: GanttRow[],
    context: { employee: Employee; tasksByRows: Task[][] },
  ) {
    for (let i = 0; i < context.tasksByRows.length; i++) {
      rows.push({
        type: 'executor',
        executor: context.employee,
        tasks: context.tasksByRows[i],
        index: rows.length,
        isFirst: i === 0,
        isLast: i === context.tasksByRows.length - 1,
      });
    }
  }
}
