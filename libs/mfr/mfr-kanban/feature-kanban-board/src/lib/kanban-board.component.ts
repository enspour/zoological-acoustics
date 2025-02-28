import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { KuduDragDirective, KuduDropContainerDirective } from '@kudu-dnd';

import { KuduFilterPipe } from '@kudu-ng-utils';

import { KuduButtonComponent, KuduIconComponent } from '@kudu-ui';

import { Task, TaskBoard, TaskColumn } from '@kudu/domain';

import {
  ProjectTaskColumnsService,
  ProjectTasksService,
} from '@kudu/mfr-data-access-project';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import { KanbanColumnComponent } from '@kudu/mfr-ui-kanban-column';
import { KanbanColumnCreationComponent } from '@kudu/mfr-ui-kanban-column-creation';
import { KanbanTaskComponent } from '@kudu/mfr-ui-kanban-task';

@Component({
  selector: 'lib-kanban-board',
  imports: [
    KuduButtonComponent,
    KuduIconComponent,
    KuduDragDirective,
    KuduDropContainerDirective,
    KuduFilterPipe,
    KanbanColumnComponent,
    KanbanColumnCreationComponent,
    KanbanTaskComponent,
  ],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
  private explorerService = inject(ExplorerService);
  private projectTasksService = inject(ProjectTasksService);
  private projectTaskColumnsService = inject(ProjectTaskColumnsService);

  public board = input.required<TaskBoard>();

  public tasks = this.projectTasksService.tasks;
  public columns = this.projectTaskColumnsService.columns;

  public onTaskClick(task: Task) {
    this.explorerService.open({
      component: BrowseTaskComponent,
      inputs: {
        task,
      },
    });
  }

  public async onColumnCreate(title: string) {
    const board = this.board();

    if (!board) {
      return;
    }

    await this.projectTaskColumnsService.createColumn({
      title,
      boardUuid: board.uuid,
    });
  }

  public onTaskCreate() {
    console.log('task create');
  }

  public onDropColumn() {
    console.log('swap columns');
  }

  public onDropTask() {
    console.log('swap tasks');
  }

  public filterByBoardFn(columns: TaskColumn, _: number, board: TaskBoard) {
    return columns.boardUuid === board.uuid;
  }

  public filterByColumnFn(task: Task, _: number, column: TaskColumn) {
    return task.columnUuid === column.uuid;
  }
}
