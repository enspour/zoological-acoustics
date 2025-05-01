import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { countBy } from '@meerkat-utils';

import { GanttTimelineComponent } from '../../gantt-timeline.component';

@Component({
  selector: 'lib-years',
  imports: [],
  templateUrl: './years.component.html',
  styleUrl: './years.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearsComponent {
  public timeline = inject(GanttTimelineComponent);

  public years = computed(() => this.getYears());

  public columnWidth = this.timeline.columnWidth;

  public getYears() {
    const dates = this.timeline.dates().map((date) => date.getYear());

    return Object.entries(countBy(dates, (date) => `${date}`)).map(
      ([value, count]) => ({
        value,
        count: count || 0,
      }),
    );
  }
}
