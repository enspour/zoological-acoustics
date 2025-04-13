import { computed, inject, Injectable } from '@angular/core';

import { ProjectMember, Task, TaskBoard } from '@kudu/domain';

import {
  ProjectMembersService,
  ProjectTaskBoardsService,
  ProjectTasksService,
} from '@kudu/mfr-data-access-project';

import { groupTasksByRows } from '@kudu/mfr-util-gantt-chart';
import { groupTasks } from '@kudu/mfr-util-tasks';

import { GanttStashService } from './gantt-stash.service';
import { GanttToolbarService } from './gantt-toolbar.service';

import { GanttRow } from './interfaces';

@Injectable()
export class GanttRowsService {
  private projectMembersService = inject(ProjectMembersService);
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

    const members = this.projectMembersService.members();

    const tasks = this.projectTasksService.tasks();
    const tasksByBoardsAndExecutors = groupTasks(tasks, 'board:executor');

    const rows: GanttRow[] = [];

    for (const board of boards) {
      const isOpen = this.ganttStashService.isOpen(board.uuid);

      this.appendBoard(rows, { board, isOpen });

      if (!isOpen) {
        continue;
      }

      const key = `${board.uuid}`;
      const tasksByExecutor = tasksByBoardsAndExecutors[key] || [];
      const tasksByRows = groupTasksByRows(tasksByExecutor);

      this.appendTasksUnassigned(rows, { tasksByRows });

      for (const member of members) {
        const key = `${board.uuid}:${member.uuid}`;
        const tasksByExecutor = tasksByBoardsAndExecutors[key] || [];
        const tasksByRows = groupTasksByRows(tasksByExecutor);

        this.appendEmployee(rows, { member, tasksByRows });
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
    context: { member: ProjectMember; tasksByRows: Task[][] },
  ) {
    for (let i = 0; i < context.tasksByRows.length; i++) {
      rows.push({
        type: 'executor',
        executor: context.member,
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
