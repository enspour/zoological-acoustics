import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { QUARTER_FULL_NAMES } from '@kudu-date';

import { countBy } from '@kudu-utils';

import { GanttTimelineComponent } from '../../gantt-timeline.component';

@Component({
  selector: 'lib-quarters-with-year',
  imports: [],
  templateUrl: './quarters-with-year.component.html',
  styleUrl: './quarters-with-year.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuartersWithYearsComponent {
  public timeline = inject(GanttTimelineComponent);

  public quarters = computed(() => this.getQuarters());

  public columnWidth = this.timeline.columnWidth;

  public getQuarters() {
    const dates = this.timeline
      .dates()
      .map((date) => `${date.getYear()} ${date.getQuarter()}`);

    return Object.entries(countBy(dates, (date) => date)).map(
      ([value, count]) => ({
        value: `${QUARTER_FULL_NAMES[+value.slice(4) - 1]}, ${value.slice(0, 4)}`,
        count: count || 0,
      }),
    );
  }
}
