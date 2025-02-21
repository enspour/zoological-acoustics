import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  KuduDragDirective,
  KuduDrop,
  KuduDropContainerDirective,
} from '@kudu-dnd';
import { KuduFilterPipe } from '@kudu-ng-utils';

import { KuduButtonComponent, KuduIconComponent } from '@kudu-ui';

import { Task, TaskColumn } from '@kudu/domain';

import {
  ProjectTaskColumnsService,
  ProjectTasksService,
} from '@kudu/mfr-data-access-project';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import { KanbanColumnComponent } from '@kudu/mfr-ui-kanban-column';
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

  public onColumnCreate() {
    console.log('column create');
  }

  public onTaskCreate(column: TaskColumn) {
    console.log(column);
  }

  public onDropColumn(event: KuduDrop) {
    // this.kanbanBoardService.moveColumn(event.prevIndex, event.nextIndex);
  }

  public onDropTask(event: KuduDrop<Task, TaskColumn, TaskColumn>) {
    // this.kanbanBoardService.moveTask(
    //   event.prevContainer,
    //   event.prevIndex,
    //   event.nextContainer,
    //   event.nextIndex,
    // );
  }

  public filterFn(task: Task, _: number, column: TaskColumn) {
    return task.columnUuid === column.uuid;
  }
}
