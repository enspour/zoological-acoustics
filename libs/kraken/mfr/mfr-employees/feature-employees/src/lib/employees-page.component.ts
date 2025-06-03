import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MkSortConfig } from '@meerkat-ui';

import { MkFilterPipe } from '@meerkat-ng-utils';

import { Employee } from '@kraken/domain';

import { EmployeesService } from '@kraken/mfr-data-access-employees';

import { EmployeeTableComponent } from '@kraken/mfr-ui-employee';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-employees-page',
  imports: [MkFilterPipe, EmployeeTableComponent, HeaderComponent],
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

  public sortBy = input<MkSortConfig['by']>();
  public sortOrder = input<MkSortConfig['order']>();

  public sortConfig = linkedSignal(() => {
    const sortBy = this.sortBy();
    const sortOrder = this.sortOrder();
    return sortBy && sortOrder ? { by: sortBy, order: sortOrder } : undefined;
  });

  public onEmployeeClick(employee: Employee) {
    this.router.navigateByUrl(`/organization/employees/${employee.uuid}`);
  }

  public onSortConfigChange(config?: MkSortConfig) {
    const queryParams = {
      ...this.route.snapshot.queryParams,
      sortBy: config?.by,
      sortOrder: config?.order,
    };

    this.router.navigate([], { queryParams, relativeTo: this.route });
  }

  public filterFn(search: string) {
    return (value: Employee) =>
      value.name.toLowerCase().includes(search.toLowerCase());
  }
}
