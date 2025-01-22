import { Injectable, signal } from '@angular/core';

import { Task } from '@kudu/domain';

@Injectable()
export class GanttService {
  public tasks = signal<Task[]>(this.generateTasks());

  private generateTasks() {
    return Array(10000)
      .fill({})
      .map((_, index) => {
        const startYear = 2024;
        const startMonth = this.rnd(11, 12);
        const endYear = this.rnd(2024, 2025);
        const endMonth =
          endYear === startYear ? this.rnd(startMonth, 12) : this.rnd(1, 4);

        return {
          uuid: `${index}`,
          title: `Задача ${index}`,
          startDate: `${startYear}-${startMonth}-01 12:00:00`,
          endDate: `${endYear}-${endMonth}-15 12:00:00`,
          projectUuid: '',
          executorUuids: [],
        };
      });
  }

  private rnd(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
