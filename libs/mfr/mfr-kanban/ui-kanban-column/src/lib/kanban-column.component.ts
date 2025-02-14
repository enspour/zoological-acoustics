import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { KuduIconComponent } from '@kudu-ui';

import { KanbanColumn } from '@kudu/mfr-data-access-kanban';

@Component({
  selector: 'lib-kanban-column',
  imports: [KuduIconComponent],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumnComponent {
  public column = input.required<KanbanColumn>();
}
