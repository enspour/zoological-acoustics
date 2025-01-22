import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { MONTH_FULL_NAMES } from '@kudu-date';

import { countBy } from '@kudu-utils';

import { GanttTimelineComponent } from '../../gantt-timeline.component';

@Component({
  selector: 'lib-months-with-year',
  imports: [],
  templateUrl: './months-with-year.component.html',
  styleUrl: './months-with-year.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthsWithYearComponent {
  public timeline = inject(GanttTimelineComponent);

  public months = computed(() => this.getMonths());

  public columnWidth = this.timeline.columnWidth;

  public getMonths() {
    const dates = this.timeline
      .dates()
      .map((date) => `${date.getYear()} ${date.getMonth()}`);

    return Object.entries(countBy(dates, (date) => date)).map(
      ([value, count]) => ({
        value: `${MONTH_FULL_NAMES[+value.slice(4)]} ${value.slice(0, 4)}`,
        count,
      }),
    );
  }
}
