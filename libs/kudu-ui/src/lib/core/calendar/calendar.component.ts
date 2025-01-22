import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  model,
} from '@angular/core';

import {
  DateTime,
  DateTimePeriod,
  DAY_SHORT_NAMES,
  MONTH_FULL_NAMES,
} from '@kudu-date';

import { kuduSize } from '../size';

import {
  KuduEqualsPipe,
  KuduGetDayPipe,
  KuduIsAvailablePipe,
  KuduIsTodayPipe,
} from './pipes';

@Component({
  selector: 'kudu-calendar',
  standalone: true,
  imports: [
    KuduIsTodayPipe,
    KuduIsAvailablePipe,
    KuduGetDayPipe,
    KuduEqualsPipe,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduCalendarComponent {
  private size = inject(kuduSize);

  public date = model<Date | number | string>(Date.now());
  public dateTime = computed(() => new DateTime(this.date()));

  public month = computed(() => this.dateTime().getMonthString());
  public year = computed(() => this.dateTime().getYear());

  public months = MONTH_FULL_NAMES;
  public weeks = DAY_SHORT_NAMES;
  public dates = computed(() => this.generateDates(this.dateTime()));

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  public onSelectDate(date: DateTime) {
    this.date.set(date.toDate());
  }

  private generateDates(date: DateTime) {
    const from = date.clone().setDay(() => -date.getFirstDayOfMonth() + 2);
    const to = from.clone().setDay((day) => day + 7 * 6);
    return new DateTimePeriod(from, to).getDates();
  }
}
