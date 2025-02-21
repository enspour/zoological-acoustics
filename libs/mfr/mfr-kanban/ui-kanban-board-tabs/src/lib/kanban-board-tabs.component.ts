import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

import { KuduDragDirective, KuduDropContainerDirective } from '@kudu-dnd';

import { TaskBoard } from '@kudu/domain';

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
  public boards = input.required<TaskBoard[]>();

  public selected = model.required<TaskBoard>();

  public onSelectTab(board: TaskBoard) {
    this.selected.set(board);
  }
}
