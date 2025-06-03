import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
} from '@angular/core';

import { GanttRowTask } from '@kraken/mfr-data-access-gantt';
import { TasksService } from '@kraken/mfr-data-access-tasks';

import { BrowseTaskComponent } from '@kraken/mfr-feature-browse-task';
import { ExplorerService } from '@kraken/mfr-feature-explorer';
import { GanttLayoutRowsDirective } from '@kraken/mfr-feature-gantt-layout';

import { TaskMoreComponent } from '@kraken/mfr-ui-task';

@Component({
  selector: 'lib-row-task',
  imports: [TaskMoreComponent],
  templateUrl: './row-task.component.html',
  styleUrl: './row-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.height.px]': 'rowHeight()',
    '[style.top.px]': 'row().index * rowHeight()',
  },
})
export class RowTaskComponent {
  private explorerService = inject(ExplorerService);
  private ganttLayoutRowsDirective = inject(GanttLayoutRowsDirective);
  private tasksService = inject(TasksService);

  public row = input.required<GanttRowTask>();
  public rowCount = this.ganttLayoutRowsDirective.rowCount;
  public rowHeight = this.ganttLayoutRowsDirective.rowHeight;

  @HostListener('click')
  public onTaskClick() {
    this.explorerService.open({
      component: BrowseTaskComponent,
      inputs: {
        task: this.row().task,
      },
    });
  }

  public async onDelete() {
    await this.tasksService.deleteTask(this.row().task);
  }
}
