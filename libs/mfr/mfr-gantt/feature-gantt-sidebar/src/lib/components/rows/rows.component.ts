import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GanttRow } from '@kudu/mfr-data-access-gantt';

import { GanttLayoutRowsDirective } from 'libs/mfr/mfr-gantt/feature-gantt-layout/src';

import { GanttSidebarComponent } from '../../gantt-sidebar.component';
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
  private ganttSidebar = inject(GanttSidebarComponent);
  private ganttLayoutRowsDirective = inject(GanttLayoutRowsDirective);

  public rows = this.ganttSidebar.rows;

  public height = this.ganttLayoutRowsDirective.height;

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
