import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { KuduIconComponent } from '@kudu-ui';

import { ProjectTaskBoardsService } from '@kudu/mfr-data-access-project';

import { KanbanBoardTabsComponent } from '@kudu/mfr-ui-kanban-board-tabs';

@Component({
  selector: 'lib-kanban-toolbar',
  imports: [KuduIconComponent, KanbanBoardTabsComponent],
  templateUrl: './kanban-toolbar.component.html',
  styleUrl: './kanban-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanToolbarComponent {
  private projectTaskBoardsService = inject(ProjectTaskBoardsService);

  public boards = this.projectTaskBoardsService.boards;
}
