import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MkTooltipDirective } from '@meerkat-ui';

import { Task } from '@octo/domain';

@Component({
  selector: 'lib-gantt-task',
  imports: [MkTooltipDirective],
  templateUrl: './gantt-task.component.html',
  styleUrl: './gantt-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttTaskComponent {
  public task = input.required<Task>();

  public onResize() {
    console.log('onResize');
  }
}
