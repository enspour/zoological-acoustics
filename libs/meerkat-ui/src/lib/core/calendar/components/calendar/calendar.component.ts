import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  linkedSignal,
  model,
  output,
} from '@angular/core';

import { MkDate } from '@meerkat-date';

import { mkSize } from '../../../size';

import { CalendarMonthsComponent } from '../calendar-months/calendar-months.component';
import { CalendarSheetComponent } from '../calendar-sheet/calendar-sheet.component';
import { CalendarSpinComponent } from '../calendar-spin/calendar-spin.component';
import { CalendarYearComponent } from '../calendar-years/calendar-years.component';

@Component({
  selector: 'mk-calendar',
  standalone: true,
  imports: [
    CalendarSheetComponent,
    CalendarSpinComponent,
    CalendarYearComponent,
    CalendarMonthsComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkCalendarComponent {
  private size = inject(mkSize);

  public date = model<MkDate>();
  public dateAvailable = linkedSignal(() => this.date() || MkDate.now());

  public mode = model<'sheet' | 'years' | 'months'>('sheet');

  public byDateClick = output<MkDate>();

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  public onDateClick(date: MkDate) {
    this.byDateClick.emit(date);
  }
}
