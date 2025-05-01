import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { MkDate, MkDatePeriod } from '@meerkat-date';

import { GanttTimelineService } from '@octo/mfr-data-access-gantt';

import { GanttLayoutColumnsDirective } from '@octo/mfr-feature-gantt-layout';

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

  public today = MkDate.now();

  public isVisible = computed(() => this.getIsVisible());
  public offset = computed(() => this.getOffset());

  public getIsVisible() {
    const { startDate, endDate } = this.ganttTimelineService.period();
    return new MkDatePeriod(startDate, endDate).isBetween(this.today);
  }

  public getOffset() {
    return getOffset(
      this.ganttTimelineService.period().startDate,
      this.today,
      this.ganttLayoutColumnsDirective.columnWidth(),
    );
  }
}
