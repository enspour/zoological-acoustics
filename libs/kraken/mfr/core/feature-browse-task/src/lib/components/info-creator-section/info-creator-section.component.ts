import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { MkTooltipDirective } from '@meerkat-ui';

import { EmployeeAvatarComponent } from '@kraken/mfr-ui-employee';

import { EmployeesService } from '@kraken/mfr-data-access-employees';

import { BrowseTaskComponent } from '../../browse-task.component';

@Component({
  selector: 'lib-info-creator-section',
  imports: [MkTooltipDirective, EmployeeAvatarComponent, DatePipe],
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
    return this.employees().find((e) => e.uuid === this.task().createdByUuid);
  }
}
