import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Employee } from '@kudu/domain';
import { EmployeeCardComponent } from '@kudu/mfr-ui-employee';

@Component({
  selector: 'lib-browse-employee',
  imports: [EmployeeCardComponent],
  templateUrl: './browse-employee.component.html',
  styleUrl: './browse-employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseEmployeeComponent {
  public employee = input.required<Employee>();
}
