import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  GanttChartLayoutDirective,
  GanttLayoutDirective,
  GanttRow,
} from '@kudu/mfr-data-access-gantt';

import { GanttChartComponent } from '../../gantt-chart.component';

import { RowExecutorComponent } from '../row-executor/row-executor.component';
import { RowTaskComponent } from '../row-task/row-task.component';

@Component({
  selector: 'lib-rows',
  imports: [RowTaskComponent, RowExecutorComponent],
  templateUrl: './rows.component.html',
  styleUrl: './rows.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowsComponent {
  private ganttChart = inject(GanttChartComponent);
  private ganttLayoutDirective = inject(GanttLayoutDirective);
  private ganttChartLayoutDirective = inject(GanttChartLayoutDirective);

  public rows = this.ganttChart.rows;

  public height = this.ganttLayoutDirective.height;
  public width = this.ganttChartLayoutDirective.width;

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
