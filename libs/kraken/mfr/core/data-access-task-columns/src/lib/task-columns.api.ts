import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { CreatableTaskColumn } from '@kraken/domain';

import {
  CreateTaskColumnResponseDto,
  DeleteTaskColumnResponseDto,
  GetTaskColumnsByProjectResponseDto,
} from './dtos';

@Injectable()
export class TaskColumnsApi {
  constructor(private http: HttpClient) {}

  public getColumnsByProject(uuid: string) {
    const url = `api/v1/tasks/columns/by-project/${uuid}`;
    return this.http
      .get<GetTaskColumnsByProjectResponseDto>(url)
      .pipe(map((response) => response.data.columns));
  }

  public createColumn(data: CreatableTaskColumn) {
    const url = 'api/v1/tasks/columns';
    return this.http
      .post<CreateTaskColumnResponseDto>(url, data)
      .pipe(map((response) => response.data.column));
  }

  public deleteColumn(uuid: string) {
    const url = `api/v1/tasks/columns/${uuid}`;
    return this.http
      .delete<DeleteTaskColumnResponseDto>(url)
      .pipe(map((response) => response.data.column));
  }
}
