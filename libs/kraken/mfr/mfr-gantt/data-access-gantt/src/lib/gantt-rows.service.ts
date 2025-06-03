import { computed, inject, Injectable } from '@angular/core';

import { Employee, Task, TaskBoard } from '@kraken/domain';

import { EmployeesService } from '@kraken/mfr-data-access-employees';
import {
  ProjectTaskBoardsService,
  ProjectTasksService,
} from '@kraken/mfr-data-access-project';

import { groupTasksByRows } from '@kraken/mfr-util-gantt-chart';
import { groupTasks } from '@kraken/mfr-util-tasks';

import { GanttStashService } from './gantt-stash.service';
import { GanttToolbarService } from './gantt-toolbar.service';

import { GanttRow } from './interfaces';

@Injectable()
export class GanttRowsService {
  private employeesService = inject(EmployeesService);
  private projectTaskBoardsService = inject(ProjectTaskBoardsService);
  private projectTasksService = inject(ProjectTasksService);
  private ganttStashService = inject(GanttStashService);
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
    const boards = this.projectTaskBoardsService.boards();

    const tasks = this.projectTasksService.tasks();
    const tasksByBoard = groupTasks(tasks, 'board');

    const rows: GanttRow[] = [];

    for (const board of boards) {
      const isOpen = this.ganttStashService.isOpen(board.uuid);

      this.appendBoard(rows, { board, isOpen });

      if (!isOpen) {
        continue;
      }

      const tasks = tasksByBoard[board.uuid] || [];
      this.appendTasks(rows, { tasks });
      this.appendTaskCreation(rows, { board });
    }

    this.appendBoardCreation(rows);

    return rows;
  }

  private groupByExecutors() {
    const boards = this.projectTaskBoardsService.boards();

    const employees = this.employeesService.employees();

    const tasks = this.projectTasksService.tasks();
    const tasksByBoards = groupTasks(tasks, 'board');

    const rows: GanttRow[] = [];

    for (const board of boards) {
      const isOpen = this.ganttStashService.isOpen(board.uuid);

      this.appendBoard(rows, { board, isOpen });

      if (!isOpen) {
        continue;
      }

      const tasksByBoard = tasksByBoards[board.uuid] || [];
      const tasksByExecutors = groupTasks(tasksByBoard, 'executor');

      const tasksByExecutor = tasksByExecutors[''] || [];
      const tasksByRows = groupTasksByRows(tasksByExecutor);

      this.appendTasksUnassigned(rows, { tasksByRows });

      for (const employee of employees) {
        const tasksByExecutor = tasksByExecutors[employee.uuid] || [];
        const tasksByRows = groupTasksByRows(tasksByExecutor);

        this.appendEmployee(rows, { employee, tasksByRows });
      }
    }

    this.appendBoardCreation(rows);

    return rows;
  }

  private appendBoard(
    rows: GanttRow[],
    context: { board: TaskBoard; isOpen: boolean },
  ) {
    rows.push({
      type: 'board',
      board: context.board,
      index: rows.length,
      isOpen: context.isOpen,
    });
  }

  private appendBoardCreation(rows: GanttRow[]) {
    rows.push({
      type: 'board-creation',
      index: rows.length,
    });
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

  private appendTasks(rows: GanttRow[], context: { tasks: Task[] }) {
    for (const task of context.tasks) {
      rows.push({
        type: 'task',
        task,
        index: rows.length,
      });
    }
  }

  private appendTaskCreation(rows: GanttRow[], context: { board: TaskBoard }) {
    rows.push({
      type: 'task-creation',
      board: context.board,
      index: rows.length,
    });
  }

  private appendTasksUnassigned(
    rows: GanttRow[],
    context: { tasksByRows: Task[][] },
  ) {
    for (let i = 0; i < context.tasksByRows.length; i++) {
      rows.push({
        type: 'tasks-unassigned',
        tasks: context.tasksByRows[i],
        index: rows.length,
        isFirst: i === 0,
        isLast: i === context.tasksByRows.length - 1,
      });
    }
  }
}
