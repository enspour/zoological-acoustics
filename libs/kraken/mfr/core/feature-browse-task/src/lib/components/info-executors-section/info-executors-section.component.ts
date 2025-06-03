import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Employee } from '@kraken/domain';

import { EmployeesService } from '@kraken/mfr-data-access-employees';
import { TasksService } from '@kraken/mfr-data-access-tasks';

import { EmployeePickerComponent } from '@kraken/mfr-ui-employee';

import { GetEmployeesByUuidPipe } from '@kraken/mfr-util-employees';

import { BrowseTaskComponent } from '../../browse-task.component';

@Component({
  selector: 'lib-info-executors-section',
  imports: [EmployeePickerComponent, GetEmployeesByUuidPipe],
  templateUrl: './info-executors-section.component.html',
  styleUrl: './info-executors-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoExecutorsSectionComponent {
  private browser = inject(BrowseTaskComponent);
  private employeesService = inject(EmployeesService);
  private tasksService = inject(TasksService);

  public task = this.browser.task;

  public employees = this.employeesService.employees;

  public async onClose(employees: Employee[]) {
    await this.tasksService.updateTask({
      ...this.task(),
      executorUuids: employees.map((e) => e.uuid),
    });
  }
}
