import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  GanttChartLayoutDirective,
  GanttTimelineService,
  GanttToolbarService,
} from '@kudu/mfr-data-access-gantt';

import { GanttBoardComponent } from '@kudu/mfr-ui-gantt-board';

@Component({
  selector: 'lib-board',
  imports: [GanttBoardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  private ganttChartLayoutDirective = inject(GanttChartLayoutDirective);
  private ganttToolbarService = inject(GanttToolbarService);
  private ganttTimelineService = inject(GanttTimelineService);

  public zoom = this.ganttToolbarService.zoom;

  public dates = this.ganttTimelineService.dates;

  public columnWidth = this.ganttChartLayoutDirective.columnWidth;
}
