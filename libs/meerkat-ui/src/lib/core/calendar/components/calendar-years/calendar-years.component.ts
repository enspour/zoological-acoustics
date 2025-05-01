import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
} from '@angular/core';

import { MkDate } from '@meerkat-date';

import { MkButtonComponent } from '../../../button';

@Component({
  selector: 'mk-calendar-years',
  imports: [MkButtonComponent],
  templateUrl: './calendar-years.component.html',
  styleUrl: './calendar-years.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarYearComponent {
  public date = model.required<MkDate>();

  public years = computed(() => this.generateYears());

  public onYearClick(year: number) {
    this.date.set(this.date().clone().setYear(year));
  }

  public generateYears() {
    return Array(2124 - 1925 + 1)
      .fill(0)
      .map((_, i) => 1925 + i);
  }
}
