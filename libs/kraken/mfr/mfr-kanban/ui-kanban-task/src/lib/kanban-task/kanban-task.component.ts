import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { MkEditableComponent, MkIconComponent } from '@meerkat-ui';

import { Task } from '@kraken/domain';

import { TaskMoreComponent } from '@kraken/mfr-ui-task';

@Component({
  selector: 'lib-kanban-task',
  imports: [MkIconComponent, MkEditableComponent, TaskMoreComponent],
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
