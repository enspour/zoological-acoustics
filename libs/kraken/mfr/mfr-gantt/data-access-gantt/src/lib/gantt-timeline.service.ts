import { computed, Injectable, signal } from '@angular/core';

import { MkDate, MkDatePeriod } from '@meerkat-date';

import { GanttPeriod } from './interfaces';

@Injectable()
export class GanttTimelineService {
  public period = signal<GanttPeriod>({
    startDate: MkDate.now()
      .setMonth((m) => m - 3)
      .startOf(),
    endDate: MkDate.now()
      .setMonth((m) => m + 12)
      .endOf(),
  });

  public dates = computed(() => {
    const { startDate, endDate } = this.period();
    return new MkDatePeriod(startDate, endDate).getDates();
  });
}
