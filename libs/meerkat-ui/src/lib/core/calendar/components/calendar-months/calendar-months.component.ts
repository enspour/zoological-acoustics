import { ChangeDetectionStrategy, Component, model } from '@angular/core';

import { MkDate, MONTH_SHORT_NAMES } from '@meerkat-date';

import { MkButtonComponent } from '../../../button';

@Component({
  selector: 'mk-calendar-months',
  imports: [MkButtonComponent],
  templateUrl: './calendar-months.component.html',
  styleUrl: './calendar-months.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarMonthsComponent {
  public date = model.required<MkDate>();

  public months = MONTH_SHORT_NAMES;

  public onMonthClick(month: number) {
    this.date.set(this.date().clone().setMonth(month));
  }
}
