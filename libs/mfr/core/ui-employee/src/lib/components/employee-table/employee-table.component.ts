import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';

import {
  KuduSortConfig,
  KuduSortDirective,
  KuduSortPipe,
  KuduTableComponent,
  KuduTableDataCellComponent,
  KuduTableHeaderComponent,
  KuduTableHeaderSortDirective,
} from '@kudu-ui';

import { Employee } from '@kudu/domain';

@Component({
  selector: 'lib-employee-table',
  imports: [
    KuduTableComponent,
    KuduTableDataCellComponent,
    KuduTableHeaderComponent,
    KuduTableHeaderSortDirective,
    KuduSortDirective,
    KuduSortPipe,
  ],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeTableComponent {
  public employees = input.required<Employee[]>();

  public sortConfig = model<KuduSortConfig>();

  public byEmployeeClick = output<Employee>();

  public onClick(employee: Employee) {
    this.byEmployeeClick.emit(employee);
  }
}
