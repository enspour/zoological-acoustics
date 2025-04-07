import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { KuduDragDirective, KuduDropContainerDirective } from '@kudu-dnd';

import { KuduFilterPipe } from '@kudu-ng-utils';

import { Task, TaskBoard, TaskColumn } from '@kudu/domain';

import {
  ProjectTaskColumnsService,
  ProjectTasksService,
} from '@kudu/mfr-data-access-project';
import { TaskColumnsService } from '@kudu/mfr-data-access-task-columns';
import { TasksService } from '@kudu/mfr-data-access-tasks';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import {
  KanbanColumnComponent,
  KanbanColumnCreationComponent,
  KanbanColumnUnassignedComponent,
} from '@kudu/mfr-ui-kanban-column';
import {
  KanbanTaskComponent,
  KanbanTaskCreationComponent,
} from '@kudu/mfr-ui-kanban-task';

@Component({
  selector: 'lib-kanban-board',
  imports: [
    KuduDragDirective,
    KuduDropContainerDirective,
    KuduFilterPipe,
    KanbanColumnComponent,
    KanbanColumnCreationComponent,
    KanbanColumnUnassignedComponent,
    KanbanTaskComponent,
    KanbanTaskCreationComponent,
  ],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
  private explorerService = inject(ExplorerService);
  private projectTasksService = inject(ProjectTasksService);
  private projectTaskColumnsService = inject(ProjectTaskColumnsService);
  private tasksService = inject(TasksService);
  private taskColumnsService = inject(TaskColumnsService);

  public board = input.required<TaskBoard>();

  public tasks = this.projectTasksService.tasks;
  public columns = this.projectTaskColumnsService.columns;

  public async onColumnCreate(title: string) {
    const board = this.board();

    if (!board) {
      return;
    }

    await this.taskColumnsService.createColumn({
      title,
      boardUuid: board.uuid,
    });
  }

  public async onColumnDelete(column: TaskColumn) {
    await this.taskColumnsService.deleteColumn(column);
  }

  public async onColumnDrop() {
    console.log('swap columns');
  }

  public onTaskClick(task: Task) {
    this.explorerService.open({
      component: BrowseTaskComponent,
      inputs: {
        task,
      },
    });
  }

  public async onTaskCreate(title: string, column: TaskColumn) {
    await this.tasksService.createTask({
      title,
      startDate: '2025-02-22',
      endDate: '2025-02-23',
      executorUuids: [],
      boardUuid: column.boardUuid,
      columnUuid: column.uuid,
    });
  }

  public async onTaskDelete(task: Task) {
    await this.tasksService.deleteTask(task);
  }

  public async onTaskDrop() {
    console.log('swap tasks');
  }

  public filterByBoardFn(columns: TaskColumn, _: number, board: TaskBoard) {
    return columns.boardUuid === board.uuid;
  }

  public filterByColumnFn(task: Task, _: number, column: TaskColumn | null) {
    return task.columnUuid === (column?.uuid || null);
  }
}
