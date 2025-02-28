import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { CreatableTask } from '@kudu/domain';

import { CreateTaskResponseDto, GetTasksByProjectResponseDto } from './dtos';

@Injectable()
export class ProjectTasksApi {
  constructor(private http: HttpClient) {}

  public getByProject(uuid: string) {
    const url = `api/v1/tasks/tasks/by-query?projectUuid[]=${uuid}`;
    return this.http
      .get<GetTasksByProjectResponseDto>(url)
      .pipe(map((response) => response.data.tasks));
  }

  public createTask(data: CreatableTask) {
    const url = 'api/v1/tasks/tasks';
    return this.http
      .post<CreateTaskResponseDto>(url, data)
      .pipe(map((response) => response.data.task));
  }
}
