import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { GetTasksByProjectDto } from './dtos';

@Injectable()
export class ProjectTasksApi {
  constructor(private http: HttpClient) {}

  public getByProject(uuid: string) {
    const url = `api/v1/tasks/tasks/by-query?projectUuid[]=${uuid}`;
    return this.http
      .get<GetTasksByProjectDto>(url)
      .pipe(map((response) => response.data.tasks));
  }
}
