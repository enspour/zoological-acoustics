import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Task } from '@kudu/domain';

@Component({
  selector: 'lib-gantt-task',
  imports: [],
  templateUrl: './gantt-task.component.html',
  styleUrl: './gantt-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttTaskComponent {
  public task = input.required<Task>();
}
