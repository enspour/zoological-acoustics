import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  GanttTimelineService,
  GanttToolbarService,
} from '@octo/mfr-data-access-gantt';

import { GanttTimelineComponent } from '@octo/mfr-ui-gantt-timeline';

import { GanttLayoutColumnsDirective } from '@octo/mfr-feature-gantt-layout';

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
