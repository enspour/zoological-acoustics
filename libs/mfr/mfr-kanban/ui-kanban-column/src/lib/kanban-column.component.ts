import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { KuduIconComponent } from '@kudu-ui';

import { TaskColumn } from '@kudu/domain';

@Component({
  selector: 'lib-kanban-column',
  imports: [KuduIconComponent],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumnComponent {
  public column = input.required<TaskColumn>();
}
