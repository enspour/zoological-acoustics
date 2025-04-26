import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

import { TaskWithColumn } from '@kudu/domain';

@Component({
  selector: 'lib-task-status',
  imports: [],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskStatusComponent {
  public task = input.required<TaskWithColumn>();

  @HostBinding('style.--color')
  public get Color() {
    return this.task().column?.color;
  }
}
