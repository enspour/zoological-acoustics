import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  input,
  model,
  output,
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

  public dateTime = model.required<DateTime>();
  public dateSelected = input<DateTime>();

  public weeks = DAY_SHORT_NAMES;
  public dates = computed(() => this.generateDates(this.dateTime()));

  public byDateClick = output<Date>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  public onDateClick(date: DateTime) {
    this.byDateClick.emit(date.toDate());
  }

  private generateDates(date: DateTime) {
    const from = date.clone().setDay(() => -date.getFirstDayOfMonth() + 2);
    const to = from.clone().setDay((day) => day + 7 * 6);
    return new DateTimePeriod(from, to).getDates();
  }
}
