import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { KuduEditableComponent, KuduIconComponent } from '@kudu-ui';

import { Task } from '@kudu/domain';

import { TaskMoreComponent } from '@kudu/mfr-ui-task';

@Component({
  selector: 'lib-kanban-task',
  imports: [KuduIconComponent, KuduEditableComponent, TaskMoreComponent],
  templateUrl: './kanban-task.component.html',
  styleUrl: './kanban-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanTaskComponent {
  public task = input.required<Task>();

  public byDelete = output<Task>();

  public onDelete() {
    this.byDelete.emit(this.task());
  }
}
