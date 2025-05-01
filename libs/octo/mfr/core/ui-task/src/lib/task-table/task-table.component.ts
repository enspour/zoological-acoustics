import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';

import {
  MkIconComponent,
  MkSortConfig,
  MkSortDirective,
  MkSortPipe,
  MkTableComponent,
  MkTableDataCellComponent,
  MkTableHeaderComponent,
  MkTableHeaderSortDirective,
} from '@meerkat-ui';

import { Employee, TaskWithColumn } from '@octo/domain';

import { EmployeePickerComponent } from '@octo/mfr-ui-employee';

import { GetEmployeesByUuidPipe } from '@octo/mfr-util-employees';
import { sortTasks } from '@octo/mfr-util-tasks';

import { TaskStatusComponent } from '../task-status/task-status.component';

interface ExecutorsChangeEvent {
  task: TaskWithColumn;
  executors: Employee[];
}

@Component({
  selector: 'lib-task-table',
  imports: [
    DatePipe,
    MkTableComponent,
    MkTableDataCellComponent,
    MkTableHeaderComponent,
    MkTableHeaderSortDirective,
    MkSortDirective,
    MkSortPipe,
    MkIconComponent,
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

  public sortConfig = model<MkSortConfig>();

  public byTaskClick = output<TaskWithColumn>();
  public byTaskExecutorsChange = output<ExecutorsChangeEvent>();

  public onTaskClick(task: TaskWithColumn) {
    this.byTaskClick.emit(task);
  }

  public onTaskExecutorsChange(task: TaskWithColumn, executors: Employee[]) {
    this.byTaskExecutorsChange.emit({ task, executors });
  }

  public sortFn(arr: TaskWithColumn[], config: MkSortConfig) {
    return sortTasks(arr, config.by as any, config.order);
  }
}
