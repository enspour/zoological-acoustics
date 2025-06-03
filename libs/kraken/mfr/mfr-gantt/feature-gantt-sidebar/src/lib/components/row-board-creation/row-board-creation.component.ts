import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';

import { MkIconComponent } from '@meerkat-ui';

import { GanttRowBoardCreation } from '@kraken/mfr-data-access-gantt';
import { ProjectService } from '@kraken/mfr-data-access-project';
import { TaskBoardsService } from '@kraken/mfr-data-access-task-boards';

import { GanttLayoutRowsDirective } from '@kraken/mfr-feature-gantt-layout';

import { TextfieldEditableComponent } from '@kraken/mfr-ui-kit';

@Component({
  selector: 'lib-row-board-creation',
  imports: [MkIconComponent, TextfieldEditableComponent],
  templateUrl: './row-board-creation.component.html',
  styleUrl: './row-board-creation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.height.px]': 'rowHeight()',
    '[style.top.px]': 'row().index * rowHeight()',
  },
})
export class RowBoardCreationComponent {
  private ganttLayoutRowsDirective = inject(GanttLayoutRowsDirective);
  private projectService = inject(ProjectService);
  private taskBoardsService = inject(TaskBoardsService);

  public row = input.required<GanttRowBoardCreation>();

  public rowHeight = this.ganttLayoutRowsDirective.rowHeight;

  public isEdit = signal(false);

  public onToggleEdit() {
    this.isEdit.update((value) => !value);
  }

  public async onCreate(title: string) {
    const projectUuid = this.projectService.project()?.uuid;

    if (!projectUuid) {
      return;
    }

    await this.taskBoardsService.createBoard({ title, projectUuid });
  }
}
