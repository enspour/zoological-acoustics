import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
} from '@angular/core';

import { Employee } from '@kudu/domain';

import { EmployeesService } from '@kudu/mfr-data-access-employees';

import { EmployeePickerComponent } from '@kudu/mfr-ui-employee';

import { TasksService } from '@kudu/mfr-data-access-tasks';
import { BrowseTaskComponent } from '../../browse-task.component';

@Component({
  selector: 'lib-info-executors-section',
  imports: [EmployeePickerComponent],
  templateUrl: './info-executors-section.component.html',
  styleUrl: './info-executors-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoExecutorsSectionComponent {
  private browser = inject(BrowseTaskComponent);
  private employeesService = inject(EmployeesService);
  private tasksService = inject(TasksService);

  private task = this.browser.task;

  public employees = this.employeesService.employees;
  public employeesSelected = linkedSignal({
    source: () => ({
      task: this.task(),
      employees: this.employees() || [],
    }),
    computation: ({ task, employees }) => {
      return employees.filter((e) => task.executorUuids.includes(e.uuid));
    },
  });

  public async onClose(employees: Employee[]) {
    await this.tasksService.updateTask({
      ...this.task(),
      executorUuids: employees.map((e) => e.uuid),
    });
  }
}
