import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { GanttRowTasksUnassigned } from '@kudu/mfr-data-access-gantt';

import { GanttLayoutRowsDirective } from '@kudu/mfr-feature-gantt-layout';

@Component({
  selector: 'lib-row-tasks-unassigned',
  imports: [],
  templateUrl: './row-tasks-unassigned.component.html',
  styleUrl: './row-tasks-unassigned.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-last]': 'row().isLast',
    '[style.height.px]': 'rowHeight()',
    '[style.top.px]': 'row().index * rowHeight()',
  },
})
export class RowTasksUnassignedComponent {
  private ganttLayoutRowsDirective = inject(GanttLayoutRowsDirective);

  public row = input.required<GanttRowTasksUnassigned>();
  public rowCount = this.ganttLayoutRowsDirective.rowCount;
  public rowHeight = this.ganttLayoutRowsDirective.rowHeight;
}
