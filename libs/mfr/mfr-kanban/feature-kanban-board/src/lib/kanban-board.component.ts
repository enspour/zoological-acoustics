import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  KuduDragDirective,
  KuduDrop,
  KuduDropContainerDirective,
} from '@kudu-dnd';

import { KuduButtonComponent, KuduIconComponent } from '@kudu-ui';

import { Task } from '@kudu/domain';

import { KanbanBoardService, KanbanColumn } from '@kudu/mfr-data-access-kanban';

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
    KanbanColumnComponent,
    KanbanTaskComponent,
  ],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
  private explorerService = inject(ExplorerService);
  private kanbanBoardService = inject(KanbanBoardService);

  public columns = this.kanbanBoardService.columns;

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

  public onTaskCreate(column: KanbanColumn) {
    console.log(column);
  }

  public onDropColumn(event: KuduDrop) {
    this.kanbanBoardService.moveColumn(event.prevIndex, event.nextIndex);
  }

  public onDropTask(event: KuduDrop<Task, KanbanColumn, KanbanColumn>) {
    this.kanbanBoardService.moveTask(
      event.prevContainer,
      event.prevIndex,
      event.nextContainer,
      event.nextIndex,
    );
  }
}
