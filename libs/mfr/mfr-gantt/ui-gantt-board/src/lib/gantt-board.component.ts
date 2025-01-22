import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { DateTime } from '@kudu-date';

import { countBy } from '@kudu-utils';

import { GanttZoom } from '@kudu/mfr-data-access-gantt';

@Component({
  selector: 'lib-gantt-board',
  imports: [],
  templateUrl: './gantt-board.component.html',
  styleUrl: './gantt-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttBoardComponent {
  public zoom = input.required<GanttZoom>();

  public dates = input.required<DateTime[]>();

  public columnWidth = input.required<number>();

  public columns = computed(() => this.getColumns());

  public getColumns() {
    const zoom = this.zoom();

    switch (zoom) {
      case 'days':
        return this.getColumnsForDays();
      case 'weeks':
        return this.getColumnsForWeeks();
      case 'months':
        return this.getColumnsForMonths();
      case 'quarter':
        return this.getColumnsForMonths();
      case 'years':
        return this.getColumnsForYears();
    }
  }

  public getColumnsForDays() {
    return this.dates().map(() => ({ width: this.columnWidth() }));
  }

  public getColumnsForWeeks() {
    const dates = this.dates().map((date) => {
      const month = date.getMonth();
      const weekNumber = date.getWeek();

      return month === 11 && weekNumber === 1
        ? `${date.getYear() + 1} ${weekNumber}`
        : `${date.getYear()} ${weekNumber}`;
    });

    return Object.values(countBy(dates, (date) => date)).map((count) => ({
      width: this.columnWidth() * count,
    }));
  }

  public getColumnsForMonths() {
    const dates = this.dates().map(
      (date) => `${date.getYear()} ${date.getMonth()}`,
    );

    return Object.values(countBy(dates, (date) => date)).map((count) => ({
      width: this.columnWidth() * count,
    }));
  }

  public getColumnsForYears() {
    const dates = this.dates().map((date) => date.getYear());

    return Object.values(countBy(dates, (date) => `${date}`)).map((count) => ({
      width: this.columnWidth() * count,
    }));
  }
}
