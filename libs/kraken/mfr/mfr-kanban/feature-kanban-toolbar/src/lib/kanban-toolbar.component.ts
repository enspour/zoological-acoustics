import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MkIconComponent } from '@meerkat-ui';

import { MkDndDragDirective, MkDndDropContainerDirective } from '@meerkat-dnd';

import { ProjectTaskBoardsService } from '@kraken/mfr-data-access-project';

import {
  KanbanBoardTabComponent,
  KanbanBoardTabsComponent,
} from '@kraken/mfr-ui-kanban-board-tabs';

@Component({
  selector: 'lib-kanban-toolbar',
  imports: [
    MkIconComponent,
    MkDndDragDirective,
    MkDndDropContainerDirective,
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
