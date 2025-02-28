import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { DateTime, DateTimePeriod } from '@kudu-date';

import { GanttTimelineService } from '@kudu/mfr-data-access-gantt';

import { GanttLayoutColumnsDirective } from '@kudu/mfr-feature-gantt-layout';

import { getOffset } from '../../utils';

@Component({
  selector: 'lib-today-marker',
  imports: [],
  templateUrl: './today-marker.component.html',
  styleUrl: './today-marker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.visible]': 'isVisible()',
    '[style.left.px]': 'offset()',
  },
})
export class TodayMarkerComponent {
  private ganttLayoutColumnsDirective = inject(GanttLayoutColumnsDirective);
  private ganttTimelineService = inject(GanttTimelineService);

  public today = DateTime.now();

  public isVisible = computed(() => this.getIsVisible());
  public offset = computed(() => this.getOffset());

  public getIsVisible() {
    const { startDate, endDate } = this.ganttTimelineService.period();
    const period = new DateTimePeriod(startDate, endDate);

    return period.isBetween(this.today);
  }

  public getOffset() {
    const { startDate } = this.ganttTimelineService.period();
    const columnWidth = this.ganttLayoutColumnsDirective.columnWidth();

    return getOffset(startDate, this.today, columnWidth);
  }
}
