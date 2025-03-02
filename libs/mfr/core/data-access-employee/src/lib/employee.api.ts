import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { GetEmployeeResponseDto } from './dtos';

@Injectable()
export class EmployeeApi {
  constructor(private http: HttpClient) {}

  public getByUuid(uuid: string) {
    const url = `api/v1/employees/employees/${uuid}`;
    return this.http
      .get<GetEmployeeResponseDto>(url)
      .pipe(map((response) => response.data.employee));
  }
}
