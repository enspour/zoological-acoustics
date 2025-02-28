import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { GanttRowTaskCreation } from '@kudu/mfr-data-access-gantt';

import { GanttLayoutRowsDirective } from '@kudu/mfr-feature-gantt-layout';

@Component({
  selector: 'lib-row-task-creation',
  imports: [],
  templateUrl: './row-task-creation.component.html',
  styleUrl: './row-task-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.height.px]': 'rowHeight()',
    '[style.top.px]': 'row().index * rowHeight()',
  },
})
export class RowTaskCreationComponent {
  private ganttLayoutRowsDirective = inject(GanttLayoutRowsDirective);

  public row = input.required<GanttRowTaskCreation>();

  public rowHeight = this.ganttLayoutRowsDirective.rowHeight;
}
