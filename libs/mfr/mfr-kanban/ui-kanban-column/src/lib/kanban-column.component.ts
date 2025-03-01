import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import { TaskColumn } from '@kudu/domain';

import { TaskColumnMoreComponent } from '@kudu/mfr-ui-task-column';

@Component({
  selector: 'lib-kanban-column',
  imports: [TaskColumnMoreComponent],
  templateUrl: './kanban-column.component.html',
  styleUrl: './kanban-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumnComponent {
  public column = input.required<TaskColumn>();

  public byDelete = output<TaskColumn>();

  public onDelete() {
    this.byDelete.emit(this.column());
  }
}
