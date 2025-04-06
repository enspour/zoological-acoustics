import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  linkedSignal,
  model,
} from '@angular/core';

import { DateTime } from '@kudu-date';

import { kuduSize } from '../../../size';

import { CalendarMonthsComponent } from '../calendar-months/calendar-months.component';
import { CalendarSheetComponent } from '../calendar-sheet/calendar-sheet.component';
import { CalendarSpinComponent } from '../calendar-spin/calendar-spin.component';
import { CalendarYearComponent } from '../calendar-years/calendar-years.component';

@Component({
  selector: 'kudu-calendar',
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
export class KuduCalendarComponent {
  private size = inject(kuduSize);

  public date = model<Date | number | string>();
  public dateTime = linkedSignal(() => new DateTime(this.date() || Date.now()));
  public dateSelected = computed(() => {
    const date = this.date();
    return date ? new DateTime(date) : undefined;
  });

  public mode = model<'sheet' | 'years' | 'months'>('sheet');

  @HostBinding('class')
  public get Classes() {
    return this.size();
  }

  public onDateClick(date: Date) {
    this.date.set(date);
  }
}
