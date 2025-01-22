import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Task } from '@kudu/domain';

import {
  GanttChartLayoutDirective,
  GanttLayoutDirective,
  GanttTimelineService,
} from '@kudu/mfr-data-access-gantt';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import { GanttTaskComponent } from '@kudu/mfr-ui-gantt-task';

import { GanttChartComponent } from '../../gantt-chart.component';

import { CalculateOffsetPipe } from '../../pipes/calculate-offset.pipe';

@Component({
  selector: 'lib-rows',
  imports: [GanttTaskComponent, CalculateOffsetPipe],
  templateUrl: './rows.component.html',
  styleUrl: './rows.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowsComponent {
  private explorerService = inject(ExplorerService);
  private ganttChart = inject(GanttChartComponent);
  private ganttLayoutDirective = inject(GanttLayoutDirective);
  private ganttChartLayoutDirective = inject(GanttChartLayoutDirective);
  private ganttTimelineService = inject(GanttTimelineService);

  public period = this.ganttTimelineService.period;

  public rows = this.ganttChart.rows;
  public rowHeight = this.ganttLayoutDirective.rowHeight;

  public columnWidth = this.ganttChartLayoutDirective.columnWidth;

  public height = this.ganttLayoutDirective.height;
  public width = this.ganttChartLayoutDirective.width;

  public onTaskClick(task: Task) {
    this.explorerService.open({
      component: BrowseTaskComponent,
      inputs: {
        task,
      },
    });
  }
}
