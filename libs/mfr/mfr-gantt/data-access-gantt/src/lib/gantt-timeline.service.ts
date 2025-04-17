import { computed, Injectable, signal } from '@angular/core';

import { KuduDate, KuduDatePeriod } from '@kudu-date';

import { GanttPeriod } from './interfaces';

@Injectable()
export class GanttTimelineService {
  public period = signal<GanttPeriod>({
    startDate: KuduDate.now()
      .setMonth((m) => m - 3)
      .startOf(),
    endDate: KuduDate.now()
      .setMonth((m) => m + 12)
      .endOf(),
  });

  public dates = computed(() => {
    const { startDate, endDate } = this.period();
    return new KuduDatePeriod(startDate, endDate).getDates();
  });
}
