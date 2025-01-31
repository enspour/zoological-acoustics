import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
} from '@angular/core';

import {
  GanttLayoutDirective,
  GanttRowTask,
} from '@kudu/mfr-data-access-gantt';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

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
  private ganttLayoutDirective = inject(GanttLayoutDirective);

  public row = input.required<GanttRowTask>();
  public rowCount = this.ganttLayoutDirective.rowCount;
  public rowHeight = this.ganttLayoutDirective.rowHeight;

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
