import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { GanttRowBoard } from '@kudu/mfr-data-access-gantt';
import { GanttLayoutRowsDirective } from 'libs/mfr/mfr-gantt/feature-gantt-layout/src';

@Component({
  selector: 'lib-row-board',
  imports: [],
  templateUrl: './row-board.component.html',
  styleUrl: './row-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.height.px]': 'rowHeight()',
    '[style.top.px]': 'row().index * rowHeight()',
  },
})
export class RowBoardComponent {
  private ganttLayoutRowsDirective = inject(GanttLayoutRowsDirective);

  public row = input.required<GanttRowBoard>();

  public rowHeight = this.ganttLayoutRowsDirective.rowHeight;
}
