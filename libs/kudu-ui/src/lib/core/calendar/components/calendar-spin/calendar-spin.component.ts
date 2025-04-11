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
  public date = model.required<DateTime>();

  public month = computed(() => this.date().getMonthString());
  public year = computed(() => this.date().getYear());

  public byYearClick = output();
  public byMonthClick = output();

  public onMonthClick() {
    this.byMonthClick.emit();
  }

  public onYearClick() {
    this.byYearClick.emit();
  }

  public onIncreaseMonth() {
    this.date.set(
      this.date()
        .clone()
        .setMonth((month) => month + 1),
    );
  }

  public onDecreaseMonth() {
    this.date.set(
      this.date()
        .clone()
        .setMonth((month) => month - 1),
    );
  }
}
