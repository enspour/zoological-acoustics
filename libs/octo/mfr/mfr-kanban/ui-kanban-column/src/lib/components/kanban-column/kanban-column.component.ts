import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  output,
} from '@angular/core';

import { TaskColumn } from '@octo/domain';

import { TaskColumnMoreComponent } from '@octo/mfr-ui-task-column';

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

  @HostBinding('style.--color')
  public get Color() {
    return this.column().color;
  }

  public onDelete() {
    this.byDelete.emit(this.column());
  }
}
