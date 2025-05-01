import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
  output,
} from '@angular/core';

import { MkDate } from '@meerkat-date';

import { MkIconComponent } from '../../../icon';

@Component({
  selector: 'mk-calendar-spin',
  imports: [MkIconComponent],
  templateUrl: './calendar-spin.component.html',
  styleUrl: './calendar-spin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSpinComponent {
  public date = model.required<MkDate>();

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
