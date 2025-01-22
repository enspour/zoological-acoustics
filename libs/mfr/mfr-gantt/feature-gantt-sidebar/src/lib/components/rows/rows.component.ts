import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Task } from '@kudu/domain';

import { GanttLayoutDirective } from '@kudu/mfr-data-access-gantt';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import { GanttSidebarComponent } from '../../gantt-sidebar.component';

@Component({
  selector: 'lib-rows',
  imports: [],
  templateUrl: './rows.component.html',
  styleUrl: './rows.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowsComponent {
  private explorerService = inject(ExplorerService);
  private ganttSidebar = inject(GanttSidebarComponent);
  private ganttLayoutDirective = inject(GanttLayoutDirective);

  public rows = this.ganttSidebar.rows;
  public rowCount = this.ganttLayoutDirective.rowCount;
  public rowHeight = this.ganttLayoutDirective.rowHeight;

  public height = this.ganttLayoutDirective.height;

  public onTaskClick(task: Task) {
    this.explorerService.open({
      component: BrowseTaskComponent,
      inputs: {
        task,
      },
    });
  }
}
