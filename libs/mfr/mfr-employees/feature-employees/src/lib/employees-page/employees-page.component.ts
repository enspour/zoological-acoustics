import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  KuduButtonComponent,
  KuduDialogService,
  KuduIconComponent,
  KuduInputComponent,
} from '@kudu-ui';

import { KuduFilterPipe } from '@kudu-template-utils';

import { Employee } from '@kudu/domain';

import {
  EmployeesService,
  provideEmployeesDataAccess,
} from '@kudu/mfr-data-access-employees';

import { EmployeeExplorerComponent } from '@kudu/mfr-feature-employee-explorer';
import { ExplorerService } from '@kudu/mfr-feature-explorer';
import { InviteEmployeeModalComponent } from '@kudu/mfr-feature-invite-employee';

import { EmployeeTableComponent } from '@kudu/mfr-ui-employee';

@Component({
  selector: 'lib-employees-page',
  imports: [
    FormsModule,
    KuduInputComponent,
    KuduIconComponent,
    KuduButtonComponent,
    KuduFilterPipe,
    EmployeeTableComponent,
  ],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideEmployeesDataAccess()],
})
export class EmployeesPageComponent implements OnInit {
  private dialogService = inject(KuduDialogService);
  private explorerService = inject(ExplorerService);
  private employeesService = inject(EmployeesService);

  public employees = this.employeesService.employees;

  public searchedTerm = signal('');

  ngOnInit(): void {
    this.employeesService.getAll();
  }

  public onInvite() {
    this.dialogService.open(InviteEmployeeModalComponent, {
      hasBackdrop: true,
    });
  }

  public onEmployeeClick(employee: Employee) {
    this.explorerService.open({
      component: EmployeeExplorerComponent,
      inputs: {
        employee,
      },
    });
  }

  public filterFn(value: Employee, _: number, search: string) {
    return value.name.includes(search);
  }
}
