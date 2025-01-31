import { computed, Injectable, signal } from '@angular/core';

import { DateTime, DateTimePeriod } from '@kudu-date';

import { GanttPeriod } from './interfaces';

@Injectable()
export class GanttTimelineService {
  public period = signal<GanttPeriod>({
    startDate: new DateTime('2024-01-01'),
    endDate: new DateTime('2025-12-31'),
  });

  public dates = computed(() => {
    const { startDate, endDate } = this.period();
    return new DateTimePeriod(startDate, endDate).getDates();
  });
}
