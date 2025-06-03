import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { GanttRowBoardCreation } from '@kraken/mfr-data-access-gantt';

import { GanttLayoutRowsDirective } from '@kraken/mfr-feature-gantt-layout';

@Component({
  selector: 'lib-row-board-creation',
  imports: [],
  templateUrl: './row-board-creation.component.html',
  styleUrl: './row-board-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.height.px]': 'rowHeight()',
    '[style.top.px]': 'row().index * rowHeight()',
  },
})
export class RowBoardCreationComponent {
  private ganttLayoutRowsDirective = inject(GanttLayoutRowsDirective);

  public row = input.required<GanttRowBoardCreation>();

  public rowHeight = this.ganttLayoutRowsDirective.rowHeight;
}
