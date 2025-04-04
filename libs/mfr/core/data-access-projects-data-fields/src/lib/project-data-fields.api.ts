import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { CreatableProjectDataField } from '@kudu/domain';

import {
  CreateProjectDataFieldResponseDto,
  GetProjectDataFieldsResponseDto,
} from './dtos';

@Injectable()
export class ProjectDataFieldsApi {
  constructor(private http: HttpClient) {}

  public getAll() {
    const url = `api/v1/projects/data-fields`;
    return this.http
      .get<GetProjectDataFieldsResponseDto>(url)
      .pipe(map((response) => response.data.fields));
  }

  public create(data: CreatableProjectDataField) {
    const url = `api/v1/projects/data-fields`;
    return this.http
      .post<CreateProjectDataFieldResponseDto>(url, data)
      .pipe(map((response) => response.data.field));
  }
}
