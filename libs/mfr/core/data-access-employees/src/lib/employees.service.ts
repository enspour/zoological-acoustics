import { computed, inject, Injectable, resource } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { EmployeesApi } from './employees.api';

@Injectable()
export class EmployeesService {
  private employeesApi = inject(EmployeesApi);

  private response = resource({
    loader: async () => {
      const response = this.employeesApi.getAll();
      return await lastValueFrom(response);
    },
  });

  public employees = computed(() => this.response.value() || []);
  public error = this.response.error;
  public isLoading = this.response.isLoading;

  public reload() {
    this.response.reload();
  }
}
