import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { KuduIconComponent } from '@kudu-ui';

import { KanbanBoardsService } from '@kudu/mfr-data-access-kanban';

import { KanbanBoardTabsComponent } from '@kudu/mfr-ui-kanban-board-tabs';

@Component({
  selector: 'lib-kanban-toolbar',
  imports: [KuduIconComponent, KanbanBoardTabsComponent],
  templateUrl: './kanban-toolbar.component.html',
  styleUrl: './kanban-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanToolbarComponent {
  public boardsService = inject(KanbanBoardsService);

  public boards = this.boardsService.boards;
}
