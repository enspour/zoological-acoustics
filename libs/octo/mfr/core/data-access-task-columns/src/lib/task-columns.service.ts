import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CreatableTaskColumn, TaskColumn } from '@octo/domain';

import { TaskColumnsApi } from './task-columns.api';

@Injectable()
export class TaskColumnsService {
  private taskColumnsApi = inject(TaskColumnsApi);

  public async getColumnsByProject(uuid: string) {
    const request = this.taskColumnsApi.getColumnsByProject(uuid);
    return await lastValueFrom(request);
  }

  public async createColumn(data: CreatableTaskColumn) {
    const request = this.taskColumnsApi.createColumn(data);
    return await lastValueFrom(request);
  }

  public async deleteColumn(column: TaskColumn) {
    const request = this.taskColumnsApi.deleteColumn(column.uuid);
    return await lastValueFrom(request);
  }
}
