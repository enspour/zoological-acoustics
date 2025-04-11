import { ChangeDetectionStrategy, Component, model } from '@angular/core';

import { DateTime, MONTH_SHORT_NAMES } from '@kudu-date';

import { KuduButtonComponent } from '../../../button';

@Component({
  selector: 'kudu-calendar-months',
  imports: [KuduButtonComponent],
  templateUrl: './calendar-months.component.html',
  styleUrl: './calendar-months.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarMonthsComponent {
  public date = model.required<DateTime>();

  public months = MONTH_SHORT_NAMES;

  public onMonthClick(month: number) {
    this.date.set(this.date().clone().setMonth(month));
  }
}
