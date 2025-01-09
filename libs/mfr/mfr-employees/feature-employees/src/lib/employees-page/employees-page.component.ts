import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import {
  EmployeesService,
  provideEmployeesDataAccess,
} from '@kudu/mfr-data-access-employees';

@Component({
  selector: 'lib-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideEmployeesDataAccess()],
})
export class EmployeesPageComponent implements OnInit {
  private employeesService = inject(EmployeesService);

  public employees = this.employeesService.employees;

  ngOnInit(): void {
    this.employeesService.getAll();
  }
}
