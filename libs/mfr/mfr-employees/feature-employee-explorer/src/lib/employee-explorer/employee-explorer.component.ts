import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Employee } from '@kudu/domain';
import { EmployeeCardComponent } from '@kudu/mfr-ui-general';

@Component({
  selector: 'lib-employee-explorer',
  imports: [EmployeeCardComponent],
  templateUrl: './employee-explorer.component.html',
  styleUrl: './employee-explorer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeExplorerComponent {
  public employee = input.required<Employee>();
}
