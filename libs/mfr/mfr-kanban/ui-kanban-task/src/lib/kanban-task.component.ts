import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { KuduEditableComponent, KuduIconComponent } from '@kudu-ui';

import { Task } from '@kudu/domain';

@Component({
  selector: 'lib-kanban-task',
  imports: [KuduIconComponent, KuduEditableComponent],
  templateUrl: './kanban-task.component.html',
  styleUrl: './kanban-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanTaskComponent {
  public task = input.required<Task>();
}
