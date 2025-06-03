import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { Task } from '@kraken/domain';

import {
  GanttRowTasksUnassigned,
  GanttTimelineService,
} from '@kraken/mfr-data-access-gantt';

import { BrowseTaskComponent } from '@kraken/mfr-feature-browse-task';
import { ExplorerService } from '@kraken/mfr-feature-explorer';
import {
  GanttLayoutColumnsDirective,
  GanttLayoutRowsDirective,
} from '@kraken/mfr-feature-gantt-layout';

import { GanttTaskComponent } from '@kraken/mfr-ui-gantt-task';

import { CalculateTaskPropsPipe } from '../../pipes/calculate-task-props.pipe';

@Component({
  selector: 'lib-row-tasks-unassigned',
  imports: [GanttTaskComponent, CalculateTaskPropsPipe],
  templateUrl: './row-tasks-unassigned.component.html',
  styleUrl: './row-tasks-unassigned.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-last]': 'row().isLast',
    '[style.height.px]': 'rowHeight()',
    '[style.top.px]': 'row().index * rowHeight()',
  },
})
export class RowTasksUnassignedComponent {
  private explorerService = inject(ExplorerService);
  private ganttLayoutRowsDirective = inject(GanttLayoutRowsDirective);
  private ganttLayoutColumnsDirective = inject(GanttLayoutColumnsDirective);
  private ganttTimelineService = inject(GanttTimelineService);

  public period = this.ganttTimelineService.period;

  public row = input.required<GanttRowTasksUnassigned>();
  public rowHeight = this.ganttLayoutRowsDirective.rowHeight;

  public columnWidth = this.ganttLayoutColumnsDirective.columnWidth;

  public onTaskClick(task: Task) {
    this.explorerService.open({
      component: BrowseTaskComponent,
      inputs: {
        task,
      },
    });
  }
}
