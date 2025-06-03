import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import {
  CreatableProjectDataField,
  UpdatableProjectDataField,
} from '@kraken/domain';

import {
  CreateProjectDataFieldResponseDto,
  DeleteProjectDataFieldResponseDto,
  GetProjectDataFieldsResponseDto,
  UpdateProjectDataFieldResponseDto,
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

  public update(data: UpdatableProjectDataField) {
    const url = `api/v1/projects/data-fields/${data.uuid}`;
    return this.http
      .put<UpdateProjectDataFieldResponseDto>(url, data)
      .pipe(map((response) => response.data.field));
  }

  public delete(uuid: string) {
    const url = `api/v1/projects/data-fields/${uuid}`;
    return this.http
      .delete<DeleteProjectDataFieldResponseDto>(url)
      .pipe(map((response) => response.data.field));
  }
}
