import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';

import {
  KuduIconComponent,
  KuduSortConfig,
  KuduSortDirective,
  KuduSortPipe,
  KuduTableComponent,
  KuduTableDataCellComponent,
  KuduTableHeaderComponent,
  KuduTableHeaderSortDirective,
} from '@kudu-ui';

import { Task } from '@kudu/domain';

@Component({
  selector: 'lib-task-table',
  imports: [
    DatePipe,
    KuduTableComponent,
    KuduTableDataCellComponent,
    KuduTableHeaderComponent,
    KuduTableHeaderSortDirective,
    KuduSortDirective,
    KuduSortPipe,
    KuduIconComponent,
  ],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTableComponent {
  public tasks = input.required<Task[]>();

  public sortConfig = model<KuduSortConfig>();

  public byTaskClick = output<Task>();

  public onClick(task: Task) {
    this.byTaskClick.emit(task);
  }
}
