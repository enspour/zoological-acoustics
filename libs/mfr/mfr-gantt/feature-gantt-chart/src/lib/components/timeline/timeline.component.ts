import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  GanttTimelineService,
  GanttToolbarService,
} from '@kudu/mfr-data-access-gantt';

import { GanttTimelineComponent } from '@kudu/mfr-ui-gantt-timeline';

import { GanttLayoutColumnsDirective } from '@kudu/mfr-feature-gantt-layout';

@Component({
  selector: 'lib-timeline',
  imports: [GanttTimelineComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  private ganttLayoutColumnsDirective = inject(GanttLayoutColumnsDirective);
  private ganttToolbarService = inject(GanttToolbarService);
  private ganttTimelineService = inject(GanttTimelineService);

  public zoom = this.ganttToolbarService.zoom;

  public dates = this.ganttTimelineService.dates;

  public columnWidth = this.ganttLayoutColumnsDirective.columnWidth;
}
