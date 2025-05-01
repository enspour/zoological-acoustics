import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { countBy } from '@meerkat-utils';

import { GanttTimelineComponent } from '../../gantt-timeline.component';

@Component({
  selector: 'lib-weeks',
  imports: [],
  templateUrl: './weeks.component.html',
  styleUrl: './weeks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeksComponent {
  public timeline = inject(GanttTimelineComponent);

  public weeks = computed(() => this.getWeeks());

  public columnWidth = this.timeline.columnWidth;

  public getWeeks() {
    const dates = this.timeline.dates().map((date) => {
      const month = date.getMonth();
      const weekNumber = date.getWeek();

      return month === 11 && weekNumber === 1
        ? `${date.getYear() + 1} ${weekNumber}`
        : `${date.getYear()} ${weekNumber}`;
    });

    return Object.entries(countBy(dates, (date) => date)).map(
      ([value, count]) => ({
        value: value.slice(4),
        count: count || 0,
      }),
    );
  }
}
