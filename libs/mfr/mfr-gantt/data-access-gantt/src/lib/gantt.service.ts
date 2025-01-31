import { computed, inject, Injectable } from '@angular/core';

import { Task } from '@kudu/domain';

import { EmployeesService } from '@kudu/mfr-data-access-employees';

@Injectable()
export class GanttService {
  private employeesService = inject(EmployeesService);

  public tasks = computed<Task[]>(() => this.generateTasks());

  private generateTasks() {
    const employees = this.employeesService.employees() || [];

    return Array(20)
      .fill({})
      .map((_, index) => {
        const startYear = 2024;
        const startMonth = this.rnd(11, 12);
        const endYear = this.rnd(2024, 2025);
        const endMonth =
          endYear === startYear ? this.rnd(startMonth, 12) : this.rnd(1, 4);

        const employee = employees[this.rnd(0, employees.length - 1)];

        return {
          uuid: `${index}`,
          title: `Задача ${index}`,
          startDate: `${startYear}-${startMonth}-01 12:00:00`,
          endDate: `${endYear}-${endMonth}-15 12:00:00`,
          projectUuid: '',
          executorUuids: employee ? [employee.uuid] : [],
        };
      });
  }

  private rnd(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
