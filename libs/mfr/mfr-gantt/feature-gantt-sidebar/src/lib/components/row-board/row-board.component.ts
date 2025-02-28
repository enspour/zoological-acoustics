import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';

import { KuduIconComponent } from '@kudu-ui';

import { TaskBoard } from '@kudu/domain';

import { GanttRowBoard, GanttStashService } from '@kudu/mfr-data-access-gantt';
import { ProjectTaskBoardsService } from '@kudu/mfr-data-access-project';

import { GanttLayoutRowsDirective } from '@kudu/mfr-feature-gantt-layout';

import { RenameableComponent } from '@kudu/mfr-ui-kit';
import { TaskBoardMoreComponent } from '@kudu/mfr-ui-task-board';

@Component({
  selector: 'lib-row-board',
  imports: [KuduIconComponent, RenameableComponent, TaskBoardMoreComponent],
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
  private projectTaskBoardsService = inject(ProjectTaskBoardsService);

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
    await this.projectTaskBoardsService.deleteBoard(board);
  }
}
