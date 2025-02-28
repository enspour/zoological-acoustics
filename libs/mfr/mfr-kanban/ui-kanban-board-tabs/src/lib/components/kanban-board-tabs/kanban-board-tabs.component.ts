import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KuduIconComponent } from '@kudu-ui';

@Component({
  selector: 'lib-kanban-board-tabs',
  imports: [KuduIconComponent],
  templateUrl: './kanban-board-tabs.component.html',
  styleUrl: './kanban-board-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardTabsComponent {}
