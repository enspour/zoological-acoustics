import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
  output,
} from '@angular/core';

import { DateTime } from '@kudu-date';

import { KuduIconComponent } from '../../../icon';

@Component({
  selector: 'kudu-calendar-spin',
  imports: [KuduIconComponent],
  templateUrl: './calendar-spin.component.html',
  styleUrl: './calendar-spin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSpinComponent {
  public dateTime = model.required<DateTime>();

  public month = computed(() => this.dateTime().getMonthString());
  public year = computed(() => this.dateTime().getYear());

  public byYearClick = output();
  public byMonthClick = output();

  public onMonthClick() {
    this.byMonthClick.emit();
  }

  public onYearClick() {
    this.byYearClick.emit();
  }

  public onIncreaseMonth() {
    this.dateTime.set(
      this.dateTime()
        .clone()
        .setMonth((month) => month + 1),
    );
  }

  public onDecreaseMonth() {
    this.dateTime.set(
      this.dateTime()
        .clone()
        .setMonth((month) => month - 1),
    );
  }
}
