import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { GetEmployeesResponseDto } from './dtos';

@Injectable()
export class EmployeesApi {
  constructor(private http: HttpClient) {}

  public getAll() {
    const url = `api/v1/employees/employees`;
    return this.http
      .get<GetEmployeesResponseDto>(url)
      .pipe(map((response) => response.data.employees));
  }
}
