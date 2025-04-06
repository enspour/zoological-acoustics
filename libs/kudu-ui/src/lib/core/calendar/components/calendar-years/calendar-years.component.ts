import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
} from '@angular/core';

import { DateTime } from '@kudu-date';

import { KuduButtonComponent } from '../../../button';

@Component({
  selector: 'kudu-calendar-years',
  imports: [KuduButtonComponent],
  templateUrl: './calendar-years.component.html',
  styleUrl: './calendar-years.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarYearComponent {
  public dateTime = model.required<DateTime>();

  public years = computed(() => this.generateYears());

  public onYearClick(year: number) {
    this.dateTime.set(this.dateTime().clone().setYear(year));
  }

  public generateYears() {
    return Array(2124 - 1925 + 1)
      .fill(0)
      .map((_, i) => 1925 + i);
  }
}
