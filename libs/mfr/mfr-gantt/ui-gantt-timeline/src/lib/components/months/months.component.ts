import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { countBy } from '@kudu-utils';

import { MONTH_FULL_NAMES, MONTH_SHORT_NAMES } from '@kudu-date';

import { GanttTimelineComponent } from '../../gantt-timeline.component';

@Component({
  selector: 'lib-months',
  imports: [],
  templateUrl: './months.component.html',
  styleUrl: './months.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthsComponent {
  public timeline = inject(GanttTimelineComponent);

  public isShort = input<boolean>(false);

  public months = computed(() => this.getMonths());

  public columnWidth = this.timeline.columnWidth;

  public getMonths() {
    const dates = this.timeline
      .dates()
      .map((date) => `${date.getYear()} ${date.getMonth()}`);

    return Object.entries(countBy(dates, (date) => date)).map(
      ([value, count]) => ({
        value: this.isShort()
          ? `${MONTH_SHORT_NAMES[+value.slice(4)]}`
          : `${MONTH_FULL_NAMES[+value.slice(4)]}`,
        count: count || 0,
      }),
    );
  }
}
