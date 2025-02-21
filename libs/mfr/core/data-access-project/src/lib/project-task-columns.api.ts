import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GetTaskColumnsByProjectDto } from './dtos';

@Injectable()
export class ProjectTaskColumnsApi {
  constructor(private http: HttpClient) {}

  public getColumnsByProject(uuid: string) {
    const url = `api/v1/tasks/columns/by-project/${uuid}`;
    return this.http
      .get<GetTaskColumnsByProjectDto>(url)
      .pipe(map((response) => response.data.columns));
  }
}
