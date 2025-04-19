import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { KuduIconComponent } from '@kudu-ui';

import { KuduDndDragDirective, KuduDndDropContainerDirective } from '@kudu-dnd';

import { ProjectTaskBoardsService } from '@kudu/mfr-data-access-project';

import {
  KanbanBoardTabComponent,
  KanbanBoardTabsComponent,
} from '@kudu/mfr-ui-kanban-board-tabs';

@Component({
  selector: 'lib-kanban-toolbar',
  imports: [
    KuduIconComponent,
    KuduDndDragDirective,
    KuduDndDropContainerDirective,
    KanbanBoardTabsComponent,
    KanbanBoardTabComponent,
  ],
  templateUrl: './kanban-toolbar.component.html',
  styleUrl: './kanban-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanToolbarComponent {
  private projectTaskBoardsService = inject(ProjectTaskBoardsService);

  public boards = this.projectTaskBoardsService.boards;
}
