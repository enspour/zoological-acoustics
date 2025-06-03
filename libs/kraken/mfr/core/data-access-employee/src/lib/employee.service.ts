import { inject, Injectable, resource, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { EmployeeApi } from './employee.api';

@Injectable()
export class EmployeeService {
  private employeeApi = inject(EmployeeApi);

  private uuid = signal<string>('');

  private resource = resource({
    request: () => this.uuid(),
    loader: async ({ request }) => {
      const response = this.employeeApi.getByUuid(request);
      return await lastValueFrom(response);
    },
  });

  public employee = this.resource.value;
  public error = this.resource.error;
  public isLoading = this.resource.isLoading;

  public setEmployee(uuid: string) {
    this.uuid.set(uuid);
  }
}
