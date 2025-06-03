import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { CreatableTask, UpdatableTask } from '@kraken/domain';

import {
  CreateTaskResponseDto,
  DeleteTaskResponseDto,
  GetTasksByProjectResponseDto,
  UpdateTaskResponseDto,
} from './dtos';

@Injectable()
export class TasksApi {
  constructor(private http: HttpClient) {}

  public getByProject(uuid: string) {
    const url = `api/v1/tasks/tasks/by-query?projectUuids[]=${uuid}`;
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

  public updateTask(data: UpdatableTask) {
    const url = `api/v1/tasks/tasks/${data.uuid}`;
    return this.http
      .put<UpdateTaskResponseDto>(url, data)
      .pipe(map((response) => response.data.task));
  }

  public deleteTask(uuid: string) {
    const url = `api/v1/tasks/tasks/${uuid}`;
    return this.http
      .delete<DeleteTaskResponseDto>(url)
      .pipe(map((response) => response.data.task));
  }
}
