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

import { DAY_SHORT_NAMES, KuduDate, KuduDatePeriod } from '@kudu-date';

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

  public date = model<KuduDate>();
  public dateAvailable = input.required<KuduDate>();

  public weeks = DAY_SHORT_NAMES;
  public dates = computed(() => this.generateDates(this.dateAvailable()));

  public byDateClick = output<KuduDate>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  public onDateClick(date: KuduDate) {
    this.date.set(date);
    this.byDateClick.emit(date);
  }

  private generateDates(date: KuduDate) {
    const from = date.clone().setDay(() => -date.toMonth().getFirstDay() + 2);
    const to = from.clone().setDay((day) => day + 7 * 6);
    return new KuduDatePeriod(from, to).getDates();
  }
}
