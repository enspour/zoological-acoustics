import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';

import { MkIconComponent } from '@meerkat-ui';

import { TaskBoard } from '@octo/domain';

import { GanttRowBoard, GanttStashService } from '@octo/mfr-data-access-gantt';
import { TaskBoardsService } from '@octo/mfr-data-access-task-boards';

import { GanttLayoutRowsDirective } from '@octo/mfr-feature-gantt-layout';

import { TextfieldEditableComponent } from '@octo/mfr-ui-kit';
import { TaskBoardMoreComponent } from '@octo/mfr-ui-task-board';

@Component({
  selector: 'lib-row-board',
  imports: [
    MkIconComponent,
    TextfieldEditableComponent,
    TaskBoardMoreComponent,
  ],
  templateUrl: './row-board.component.html',
  styleUrl: './row-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.editable]': 'isEdit()',
    '[style.height.px]': 'rowHeight()',
    '[style.top.px]': 'row().index * rowHeight()',
  },
})
export class RowBoardComponent {
  private ganttLayoutRowsDirective = inject(GanttLayoutRowsDirective);
  private ganttStashService = inject(GanttStashService);
  private taskBoardsService = inject(TaskBoardsService);

  public row = input.required<GanttRowBoard>();

  public rowHeight = this.ganttLayoutRowsDirective.rowHeight;

  public isEdit = signal(false);

  public onToggle() {
    this.ganttStashService.toggle(this.row().board.uuid);
  }

  public onRename() {
    this.isEdit.set(true);
  }

  public async onDelete(board: TaskBoard) {
    await this.taskBoardsService.deleteBoard(board);
  }
}
