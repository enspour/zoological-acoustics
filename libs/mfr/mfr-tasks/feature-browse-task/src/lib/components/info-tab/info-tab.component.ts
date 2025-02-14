import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
} from '@angular/core';

import { EmployeesService } from '@kudu/mfr-data-access-employees';

import { EmployeePickerComponent } from '@kudu/mfr-ui-employee';

import { BrowseTaskComponent } from '../../browse-task.component';

@Component({
  selector: 'lib-info-tab',
  imports: [EmployeePickerComponent],
  templateUrl: './info-tab.component.html',
  styleUrl: './info-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoTabComponent {
  private browser = inject(BrowseTaskComponent);

  private employeesService = inject(EmployeesService);

  public employees = this.employeesService.employees;
  public employeesSelected = linkedSignal({
    source: () => ({
      task: this.browser.task(),
      employees: this.employees() || [],
    }),
    computation: ({ task, employees }) => {
      return employees.filter((e) => task.executorUuids.includes(e.uuid));
    },
  });
}
