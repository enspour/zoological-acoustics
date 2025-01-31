import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { Task } from '@kudu/domain';

import {
  GanttChartLayoutDirective,
  GanttLayoutDirective,
  GanttRowExecutor,
  GanttTimelineService,
} from '@kudu/mfr-data-access-gantt';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import { GanttTaskComponent } from '@kudu/mfr-ui-gantt-task';

import { CalculateTaskPropsPipe } from '../../pipes/calculate-task-props.pipe';

@Component({
  selector: 'lib-row-executor',
  imports: [GanttTaskComponent, CalculateTaskPropsPipe],
  templateUrl: './row-executor.component.html',
  styleUrl: './row-executor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-last]': 'row().isLast',
    '[style.height.px]': 'rowHeight()',
    '[style.top.px]': 'row().index * rowHeight()',
  },
})
export class RowExecutorComponent {
  private explorerService = inject(ExplorerService);
  private ganttLayoutDirective = inject(GanttLayoutDirective);
  private ganttChartLayoutDirective = inject(GanttChartLayoutDirective);
  private ganttTimelineService = inject(GanttTimelineService);

  public period = this.ganttTimelineService.period;

  public row = input.required<GanttRowExecutor>();
  public rowHeight = this.ganttLayoutDirective.rowHeight;

  public columnWidth = this.ganttChartLayoutDirective.columnWidth;

  public onTaskClick(task: Task) {
    this.explorerService.open({
      component: BrowseTaskComponent,
      inputs: {
        task,
      },
    });
  }
}
