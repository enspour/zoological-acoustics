import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GanttLayoutDirective, GanttRow } from '@kudu/mfr-data-access-gantt';

import { GanttSidebarComponent } from '../../gantt-sidebar.component';
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
  private ganttSidebar = inject(GanttSidebarComponent);
  private ganttLayoutDirective = inject(GanttLayoutDirective);

  public rows = this.ganttSidebar.rows;

  public height = this.ganttLayoutDirective.height;

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
