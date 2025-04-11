import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { KuduSortConfig } from '@kudu-ui';

import { KuduFilterPipe } from '@kudu-ng-utils';

import { Employee } from '@kudu/domain';

import { EmployeesService } from '@kudu/mfr-data-access-employees';

import { EmployeeTableComponent } from '@kudu/mfr-ui-employee';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-employees-page',
  imports: [KuduFilterPipe, EmployeeTableComponent, HeaderComponent],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private employeesService = inject(EmployeesService);

  public employees = this.employeesService.employees;

  public searchTerm = input<string>();

  public sortBy = input<KuduSortConfig['by']>();
  public sortOrder = input<KuduSortConfig['order']>();

  public sortConfig = linkedSignal(() => {
    const sortBy = this.sortBy();
    const sortOrder = this.sortOrder();
    return sortBy && sortOrder ? { by: sortBy, order: sortOrder } : undefined;
  });

  public onEmployeeClick(employee: Employee) {
    this.router.navigateByUrl(`/employees/${employee.uuid}`);
  }

  public onSortConfigChange(config?: KuduSortConfig) {
    const queryParams = {
      ...this.route.snapshot.queryParams,
      sortBy: config?.by,
      sortOrder: config?.order,
    };

    this.router.navigate([`/employees`], { queryParams });
  }

  public filterFn(search: string) {
    return (value: Employee) =>
      value.name.toLowerCase().includes(search.toLowerCase());
  }
}
