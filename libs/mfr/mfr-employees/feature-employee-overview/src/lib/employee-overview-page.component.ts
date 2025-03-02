import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-employee-overview-page',
  imports: [],
  templateUrl: './employee-overview-page.component.html',
  styleUrl: './employee-overview-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeOverviewPageComponent {}
