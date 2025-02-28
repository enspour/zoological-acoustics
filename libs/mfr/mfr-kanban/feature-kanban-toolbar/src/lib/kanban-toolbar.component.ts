import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KuduDragDirective, KuduDropContainerDirective } from '@kudu-dnd';

import { ProjectTaskBoardsService } from '@kudu/mfr-data-access-project';

import {
  KanbanBoardTabComponent,
  KanbanBoardTabsComponent,
} from '@kudu/mfr-ui-kanban-board-tabs';

@Component({
  selector: 'lib-kanban-toolbar',
  imports: [
    KanbanBoardTabsComponent,
    KanbanBoardTabComponent,
    KuduDropContainerDirective,
    KuduDragDirective,
  ],
  templateUrl: './kanban-toolbar.component.html',
  styleUrl: './kanban-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanToolbarComponent {
  private projectTaskBoardsService = inject(ProjectTaskBoardsService);

  public boards = this.projectTaskBoardsService.boards;
}
