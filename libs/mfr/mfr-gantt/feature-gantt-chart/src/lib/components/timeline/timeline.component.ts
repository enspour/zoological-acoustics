import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  GanttChartLayoutDirective,
  GanttTimelineService,
  GanttToolbarService,
} from '@kudu/mfr-data-access-gantt';

import { GanttTimelineComponent } from '@kudu/mfr-ui-gantt-timeline';

@Component({
  selector: 'lib-timeline',
  imports: [GanttTimelineComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  private ganttChartLayoutDirective = inject(GanttChartLayoutDirective);
  private ganttToolbarService = inject(GanttToolbarService);
  private ganttTimelineService = inject(GanttTimelineService);

  public zoom = this.ganttToolbarService.zoom;

  public dates = this.ganttTimelineService.dates;

  public columnWidth = this.ganttChartLayoutDirective.columnWidth;
}
