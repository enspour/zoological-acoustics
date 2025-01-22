import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { GanttRow } from '@kudu/mfr-data-access-gantt';

import { BoardComponent } from './components/board/board.component';
import { RowsComponent } from './components/rows/rows.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TodayMarkerComponent } from './components/today-marker/today-marker.component';

@Component({
  selector: 'lib-gantt-chart',
  imports: [
    RowsComponent,
    BoardComponent,
    TimelineComponent,
    TodayMarkerComponent,
  ],
  templateUrl: './gantt-chart.component.html',
  styleUrl: './gantt-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttChartComponent {
  public rows = input.required<GanttRow[]>();
}
