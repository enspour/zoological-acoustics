import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { KuduInputComponent } from '@kudu-ui';

import { KuduFilterPipe } from '@kudu-template-utils';

import { Employee } from '@kudu/domain';

import {
  EmployeesService,
  provideEmployeesDataAccess,
} from '@kudu/mfr-data-access-employees';

import { ExplorerService } from '@kudu/mfr-feature-explorer';

import {
  EmployeeCardComponent,
  EmployeeTableComponent,
} from '@kudu/mfr-ui-general';

@Component({
  selector: 'lib-employees-page',
  imports: [
    FormsModule,
    KuduInputComponent,
    KuduFilterPipe,
    EmployeeTableComponent,
  ],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideEmployeesDataAccess()],
})
export class EmployeesPageComponent implements OnInit {
  private explorerService = inject(ExplorerService);
  private employeesService = inject(EmployeesService);

  public employees = this.employeesService.employees;

  public searchedTerm = signal('');

  ngOnInit(): void {
    this.employeesService.getAll();
  }

  public onEmployeeClick(employee: Employee) {
    this.explorerService.open({
      component: EmployeeCardComponent,
      inputs: {
        employee,
      },
    });
  }

  public filterFn(value: Employee, _: number, search: string) {
    return value.name.includes(search);
  }
}
