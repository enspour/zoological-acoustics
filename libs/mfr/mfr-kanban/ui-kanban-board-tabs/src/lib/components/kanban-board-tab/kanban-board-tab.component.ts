import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { KuduIconComponent } from '@kudu-ui';

import { TaskBoard } from '@kudu/domain';

@Component({
  selector: 'lib-kanban-board-tab',
  imports: [KuduIconComponent],
  templateUrl: './kanban-board-tab.component.html',
  styleUrl: './kanban-board-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.active]': 'isActive()',
  },
})
export class KanbanBoardTabComponent {
  public board = input.required<TaskBoard>();

  public isActive = input(false);
}
