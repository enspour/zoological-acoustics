import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  input,
  model,
} from '@angular/core';

import { DateTime, DateTimePeriod, DAY_SHORT_NAMES } from '@kudu-date';

import { kuduSize } from '../../../size';

import {
  KuduEqualsPipe,
  KuduGetDayPipe,
  KuduIsAvailablePipe,
  KuduIsTodayPipe,
} from '../../pipes';

@Component({
  selector: 'kudu-calendar-sheet',
  imports: [
    KuduIsTodayPipe,
    KuduIsAvailablePipe,
    KuduGetDayPipe,
    KuduEqualsPipe,
  ],
  templateUrl: './calendar-sheet.component.html',
  styleUrl: './calendar-sheet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSheetComponent {
  private size = inject(kuduSize);

  public date = model<DateTime>();
  public dateAvailable = input.required<DateTime>();

  public weeks = DAY_SHORT_NAMES;
  public dates = computed(() => this.generateDates(this.dateAvailable()));

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  public onDateClick(date: DateTime) {
    this.date.set(date);
  }

  private generateDates(date: DateTime) {
    const from = date.clone().setDay(() => -date.getFirstDayOfMonth() + 2);
    const to = from.clone().setDay((day) => day + 7 * 6);
    return new DateTimePeriod(from, to).getDates();
  }
}
