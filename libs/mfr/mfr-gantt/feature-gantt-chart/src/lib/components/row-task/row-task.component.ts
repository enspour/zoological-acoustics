import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { Task } from '@kudu/domain';

import {
  GanttRowTask,
  GanttTimelineService,
} from '@kudu/mfr-data-access-gantt';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import { GanttTaskComponent } from '@kudu/mfr-ui-gantt-task';

import {
  GanttLayoutColumnsDirective,
  GanttLayoutRowsDirective,
} from 'libs/mfr/mfr-gantt/feature-gantt-layout/src';

import { CalculateTaskPropsPipe } from '../../pipes/calculate-task-props.pipe';

@Component({
  selector: 'lib-row-task',
  imports: [GanttTaskComponent, CalculateTaskPropsPipe],
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
  private ganttLayoutColumnsDirective = inject(GanttLayoutColumnsDirective);
  private ganttTimelineService = inject(GanttTimelineService);

  public period = this.ganttTimelineService.period;

  public row = input.required<GanttRowTask>();
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
