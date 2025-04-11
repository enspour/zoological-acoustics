import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { KuduTooltipDirective } from '@kudu-ui';

import { EmployeeAvatarComponent } from '@kudu/mfr-ui-employee';

import { EmployeesService } from '@kudu/mfr-data-access-employees';

import { BrowseTaskComponent } from '../../browse-task.component';

@Component({
  selector: 'lib-info-creator-section',
  imports: [KuduTooltipDirective, EmployeeAvatarComponent, DatePipe],
  templateUrl: './info-creator-section.component.html',
  styleUrl: './info-creator-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCreatorSectionComponent {
  private browser = inject(BrowseTaskComponent);
  private employeesService = inject(EmployeesService);

  public task = this.browser.task;

  public employees = this.employeesService.employees;

  public creator = computed(() => this.getCreator());

  public getCreator() {
    const employees = this.employees() || [];
    return employees.find((e) => e.uuid === this.task().createdByUuid);
  }
}
