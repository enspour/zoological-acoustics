import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';

import { MkIconComponent } from '@meerkat-ui';

import { GanttRowTaskCreation } from '@octo/mfr-data-access-gantt';
import { TasksService } from '@octo/mfr-data-access-tasks';

import { GanttLayoutRowsDirective } from '@octo/mfr-feature-gantt-layout';

import { TextfieldEditableComponent } from '@octo/mfr-ui-kit';

@Component({
  selector: 'lib-row-task-creation',
  imports: [MkIconComponent, TextfieldEditableComponent],
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
  private tasksService = inject(TasksService);

  public row = input.required<GanttRowTaskCreation>();

  public rowHeight = this.ganttLayoutRowsDirective.rowHeight;

  public isEdit = signal(false);

  public onToggleEdit() {
    this.isEdit.update((value) => !value);
  }

  public async onCreate(title: string) {
    const board = this.row().board;

    await this.tasksService.createTask({
      title,
      startDate: '2025-02-22',
      endDate: '2025-02-23',
      executorUuids: [],
      boardUuid: board.uuid,
      columnUuid: null,
    });
  }
}
