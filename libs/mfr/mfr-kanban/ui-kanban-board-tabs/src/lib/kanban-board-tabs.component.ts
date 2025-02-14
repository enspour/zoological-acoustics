import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

import { KuduDragDirective, KuduDropContainerDirective } from '@kudu-dnd';

import { KanbanBoard } from '@kudu/mfr-data-access-kanban';

import { KanbanBoardTabComponent } from './components/kanban-board-tab/kanban-board-tab.component';

@Component({
  selector: 'lib-kanban-board-tabs',
  imports: [
    KuduDropContainerDirective,
    KuduDragDirective,
    KanbanBoardTabComponent,
  ],
  templateUrl: './kanban-board-tabs.component.html',
  styleUrl: './kanban-board-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardTabsComponent {
  public boards = input.required<KanbanBoard[]>();

  public selected = model.required<KanbanBoard>();

  public onSelectTab(board: KanbanBoard) {
    this.selected.set(board);
  }
}
