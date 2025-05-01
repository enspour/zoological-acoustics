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

import { DAY_SHORT_NAMES, MkDate, MkDatePeriod } from '@meerkat-date';

import { mkSize } from '../../../size';

import {
  MkEqualsPipe,
  MkGetDayPipe,
  MkIsAvailablePipe,
  MkIsTodayPipe,
} from '../../pipes';

@Component({
  selector: 'mk-calendar-sheet',
  imports: [MkIsTodayPipe, MkIsAvailablePipe, MkGetDayPipe, MkEqualsPipe],
  templateUrl: './calendar-sheet.component.html',
  styleUrl: './calendar-sheet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSheetComponent {
  private size = inject(mkSize);

  public date = model<MkDate>();
  public dateAvailable = input.required<MkDate>();

  public weeks = DAY_SHORT_NAMES;
  public dates = computed(() => this.generateDates(this.dateAvailable()));

  public byDateClick = output<MkDate>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  public onDateClick(date: MkDate) {
    this.date.set(date);
    this.byDateClick.emit(date);
  }

  private generateDates(date: MkDate) {
    const from = date.clone().setDay(() => -date.toMonth().getFirstDay() + 2);
    const to = from.clone().setDay((day) => day + 7 * 6);
    return new MkDatePeriod(from, to).getDates();
  }
}
