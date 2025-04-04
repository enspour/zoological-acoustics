import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  KuduButtonComponent,
  KuduDialogService,
  KuduIconComponent,
  KuduInputComponent,
  KuduInputContainerComponent,
} from '@kudu-ui';

import { KuduFilterPipe } from '@kudu-ng-utils';

import { Employee } from '@kudu/domain';

import { EmployeesService } from '@kudu/mfr-data-access-employees';

import { InviteEmployeeModalComponent } from '@kudu/mfr-feature-invite-employee';

import { EmployeeTableComponent } from '@kudu/mfr-ui-employee';

@Component({
  selector: 'lib-employees-page',
  imports: [
    FormsModule,
    KuduInputComponent,
    KuduInputContainerComponent,
    KuduIconComponent,
    KuduButtonComponent,
    KuduFilterPipe,
    EmployeeTableComponent,
  ],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesPageComponent {
  private router = inject(Router);
  private dialogService = inject(KuduDialogService);
  private employeesService = inject(EmployeesService);

  public employees = this.employeesService.employees;

  public searchTerm = input<string>();

  public onSearchTermChange(searchTerm: string) {
    this.router.navigateByUrl(`/employees?searchTerm=${searchTerm}`);
  }

  public onInvite() {
    this.dialogService.open(InviteEmployeeModalComponent, {
      hasBackdrop: true,
    });
  }

  public onEmployeeClick(employee: Employee) {
    this.router.navigateByUrl(`/employees/${employee.uuid}`);
  }

  public filterFn(value: Employee, _: number, search: string) {
    return value.name.toLowerCase().includes(search.toLowerCase());
  }
}
