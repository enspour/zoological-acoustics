import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnChanges,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { EmployeeService } from '@kraken/mfr-data-access-employee';

import { AvatarComponent } from './components/avatar/avatar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-employee-page',
  imports: [RouterOutlet, HeaderComponent, AvatarComponent],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePageComponent implements OnChanges {
  private employeeService = inject(EmployeeService);

  public employeeUuid = input.required<string>();

  public employee = this.employeeService.employee;
  public error = this.employeeService.error;
  public isLoading = this.employeeService.isLoading;

  ngOnChanges(): void {
    this.employeeService.setEmployee(this.employeeUuid());
  }
}
