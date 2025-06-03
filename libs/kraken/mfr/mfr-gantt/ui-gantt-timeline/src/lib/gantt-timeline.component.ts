import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MkDate } from '@meerkat-date';

import { GanttZoom } from '@kraken/mfr-data-access-gantt';

import { DaysComponent } from './components/days/days.component';
import { MonthsWithYearComponent } from './components/months-with-year/months-with-year.component';
import { MonthsComponent } from './components/months/months.component';
import { QuartersWithYearsComponent } from './components/quarters-with-year/quarters-with-year.component';
import { WeeksComponent } from './components/weeks/weeks.component';
import { YearsComponent } from './components/years/years.component';

@Component({
  selector: 'lib-gantt-timeline',
  imports: [
    DaysComponent,
    MonthsComponent,
    MonthsWithYearComponent,
    YearsComponent,
    WeeksComponent,
    QuartersWithYearsComponent,
  ],
  templateUrl: './gantt-timeline.component.html',
  styleUrl: './gantt-timeline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttTimelineComponent {
  public zoom = input.required<GanttZoom>();

  public dates = input.required<MkDate[]>();

  public columnWidth = input.required<number>();
}
