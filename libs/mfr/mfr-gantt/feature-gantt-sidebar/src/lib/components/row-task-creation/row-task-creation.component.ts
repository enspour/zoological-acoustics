import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';

import { KuduIconComponent } from '@kudu-ui';

import { GanttRowTaskCreation } from '@kudu/mfr-data-access-gantt';
import {
  ProjectTaskColumnsService,
  ProjectTasksService,
} from '@kudu/mfr-data-access-project';

import { GanttLayoutRowsDirective } from '@kudu/mfr-feature-gantt-layout';

import { RenameableComponent } from '@kudu/mfr-ui-kit';

@Component({
  selector: 'lib-row-task-creation',
  imports: [KuduIconComponent, RenameableComponent],
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
  private projectTasksService = inject(ProjectTasksService);
  private projectTaskColumnsService = inject(ProjectTaskColumnsService);

  public row = input.required<GanttRowTaskCreation>();

  public rowHeight = this.ganttLayoutRowsDirective.rowHeight;

  public isEdit = signal(false);

  public onToggleEdit() {
    this.isEdit.update((value) => !value);
  }

  public onCreate(title: string) {
    const board = this.row().board;

    const columns = this.projectTaskColumnsService.columns() || [];
    const column = columns.find((c) => c.boardUuid === board.uuid);

    if (!column) {
      return;
    }

    this.projectTasksService.createTask({
      title,
      boardUuid: board.uuid,
      startDate: '2025-02-22',
      endDate: '2025-02-23',
      executorUuids: [],
      columnUuid: column.uuid,
    });
  }
}
