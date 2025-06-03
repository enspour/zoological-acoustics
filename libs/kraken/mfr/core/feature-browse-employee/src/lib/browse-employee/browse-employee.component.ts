import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Employee } from '@kraken/domain';

@Component({
  selector: 'lib-browse-employee',
  imports: [],
  templateUrl: './browse-employee.component.html',
  styleUrl: './browse-employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseEmployeeComponent {
  public employee = input.required<Employee>();
}
