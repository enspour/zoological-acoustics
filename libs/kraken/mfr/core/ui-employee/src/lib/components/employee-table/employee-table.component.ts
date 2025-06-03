import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';

import {
  MkSortConfig,
  MkSortDirective,
  MkSortPipe,
  MkTableComponent,
  MkTableDataCellComponent,
  MkTableHeaderComponent,
  MkTableHeaderSortDirective,
} from '@meerkat-ui';

import { Employee } from '@kraken/domain';

import { EmployeeAvatarComponent } from '../employee-avatar/employee-avatar.component';

@Component({
  selector: 'lib-employee-table',
  imports: [
    MkTableComponent,
    MkTableDataCellComponent,
    MkTableHeaderComponent,
    MkTableHeaderSortDirective,
    MkSortDirective,
    MkSortPipe,
    EmployeeAvatarComponent,
  ],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeTableComponent {
  public employees = input.required<Employee[]>();

  public sortConfig = model<MkSortConfig>();

  public byEmployeeClick = output<Employee>();

  public onClick(employee: Employee) {
    this.byEmployeeClick.emit(employee);
  }
}
