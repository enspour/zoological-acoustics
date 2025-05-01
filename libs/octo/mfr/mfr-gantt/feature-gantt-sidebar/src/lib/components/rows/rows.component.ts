import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GanttRow } from '@octo/mfr-data-access-gantt';

import { GanttLayoutRowsDirective } from '@octo/mfr-feature-gantt-layout';

import { GanttSidebarComponent } from '../../gantt-sidebar.component';
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
