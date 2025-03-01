import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GanttRow } from '@kudu/mfr-data-access-gantt';

import { GanttChartComponent } from '../../gantt-chart.component';

import {
  GanttLayoutColumnsDirective,
  GanttLayoutRowsDirective,
} from '@kudu/mfr-feature-gantt-layout';

import { RowBoardCreationComponent } from '../row-board-creation/row-board-creation.component';
import { RowBoardComponent } from '../row-board/row-board.component';
import { RowExecutorComponent } from '../row-executor/row-executor.component';
import { RowTaskCreationComponent } from '../row-task-creation/row-task-creation.component';
import { RowTaskComponent } from '../row-task/row-task.component';
import { RowTasksUnassignedComponent } from '../row-tasks-unassigned/row-tasks-unassigned.component';

@Component({
  selector: 'lib-rows',
  imports: [
    RowTaskComponent,
    RowTaskCreationComponent,
    RowTasksUnassignedComponent,
    RowExecutorComponent,
    RowBoardComponent,
    RowBoardCreationComponent,
  ],
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
