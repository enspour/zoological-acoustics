import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GanttRow } from '@kudu/mfr-data-access-gantt';

import { GanttChartComponent } from '../../gantt-chart.component';

import {
  GanttLayoutColumnsDirective,
  GanttLayoutRowsDirective,
} from 'libs/mfr/mfr-gantt/feature-gantt-layout/src';

import { RowBoardComponent } from '../row-board/row-board.component';
import { RowExecutorComponent } from '../row-executor/row-executor.component';
import { RowTaskComponent } from '../row-task/row-task.component';

@Component({
  selector: 'lib-rows',
  imports: [RowTaskComponent, RowExecutorComponent, RowBoardComponent],
  templateUrl: './rows.component.html',
  styleUrl: './rows.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowsComponent {
  private ganttChart = inject(GanttChartComponent);
  private ganttLayoutRowsDirective = inject(GanttLayoutRowsDirective);
  private ganttLayoutColumnsDirective = inject(GanttLayoutColumnsDirective);

  public rows = this.ganttChart.rows;

  public height = this.ganttLayoutRowsDirective.height;
  public width = this.ganttLayoutColumnsDirective.width;

  public trackByFn(index: number, row: GanttRow) {
    if (row.type === 'task') {
      return row.task.uuid;
    }

    if (row.type === 'executor') {
      return row.executor.uuid;
    }

    return index;
  }
}
