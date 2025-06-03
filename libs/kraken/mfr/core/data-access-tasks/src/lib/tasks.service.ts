import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CreatableTask, Task, UpdatableTask } from '@kraken/domain';

import { TasksApi } from './tasks.api';

@Injectable()
export class TasksService {
  private tasksApi = inject(TasksApi);

  public async getTasksByProject(uuid: string) {
    const request = this.tasksApi.getByProject(uuid);
    return await lastValueFrom(request);
  }

  public async createTask(data: CreatableTask) {
    const request = this.tasksApi.createTask(data);
    return await lastValueFrom(request);
  }

  public async updateTask(data: UpdatableTask) {
    const request = this.tasksApi.updateTask(data);
    return await lastValueFrom(request);
  }

  public async deleteTask(task: Task) {
    const request = this.tasksApi.deleteTask(task.uuid);
    return await lastValueFrom(request);
  }
}
