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

import { Employee, TaskWithColumn } from '@kudu/domain';

import { EmployeePickerComponent } from '@kudu/mfr-ui-employee';

import { GetEmployeesByUuidPipe } from '@kudu/mfr-util-employees';
import { sortTasks } from '@kudu/mfr-util-tasks';

import { TaskStatusComponent } from '../task-status/task-status.component';

interface ExecutorsChangeEvent {
  task: TaskWithColumn;
  executors: Employee[];
}

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
    EmployeePickerComponent,
    GetEmployeesByUuidPipe,
    TaskStatusComponent,
  ],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTableComponent {
  public tasks = input.required<TaskWithColumn[]>();
  public employees = input.required<Employee[]>();

  public sortConfig = model<KuduSortConfig>();

  public byTaskClick = output<TaskWithColumn>();
  public byTaskExecutorsChange = output<ExecutorsChangeEvent>();

  public onTaskClick(task: TaskWithColumn) {
    this.byTaskClick.emit(task);
  }

  public onTaskExecutorsChange(task: TaskWithColumn, executors: Employee[]) {
    this.byTaskExecutorsChange.emit({ task, executors });
  }

  public sortFn(arr: TaskWithColumn[], config: KuduSortConfig) {
    return sortTasks(arr, config.by as any, config.order);
  }
}
