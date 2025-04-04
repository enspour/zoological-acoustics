import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { provideKanbanDataAccess } from '@kudu/mfr-data-access-kanban';
import { ProjectTaskBoardsService } from '@kudu/mfr-data-access-project';

import { KanbanBoardComponent } from '@kudu/mfr-feature-kanban-board';
import { KanbanToolbarComponent } from '@kudu/mfr-feature-kanban-toolbar';

import { KanbanBoardSaverDirective } from '@kudu/mfr-util-kanban-last-board';

@Component({
  selector: 'lib-kanban-page',
  imports: [KanbanBoardComponent, KanbanToolbarComponent],
  templateUrl: './kanban-page.component.html',
  styleUrl: './kanban-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideKanbanDataAccess()],
  hostDirectives: [KanbanBoardSaverDirective],
})
export class KanbanPageComponent {
  private projectTaskBoardsService = inject(ProjectTaskBoardsService);

  public boardUuid = input<string>();
  public board = computed(() => this.getBoard());

  private getBoard() {
    const boards = this.projectTaskBoardsService.boards() || [];
    const boardUuid = this.boardUuid();

    if (boardUuid) {
      const board = boards.find((board) => board.uuid === boardUuid);

      if (board) {
        return board;
      }
    }

    return null;
  }
}
