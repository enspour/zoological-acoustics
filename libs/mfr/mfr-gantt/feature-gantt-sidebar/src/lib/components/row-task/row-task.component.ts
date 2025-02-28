import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
} from '@angular/core';

import { GanttRowTask } from '@kudu/mfr-data-access-gantt';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import { GanttLayoutRowsDirective } from '@kudu/mfr-feature-gantt-layout';

@Component({
  selector: 'lib-row-task',
  imports: [],
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
}
