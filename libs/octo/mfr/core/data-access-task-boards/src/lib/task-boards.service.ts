import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CreatableTaskBoard, TaskBoard } from '@octo/domain';

import { TaskBoardsApi } from './task-boards.api';

@Injectable()
export class TaskBoardsService {
  private taskBoardsApi = inject(TaskBoardsApi);

  public async getBoardsByProject(uuid: string) {
    const request = this.taskBoardsApi.getBoardsByProject(uuid);
    return await lastValueFrom(request);
  }

  public async createBoard(data: CreatableTaskBoard) {
    const request = this.taskBoardsApi.createBoard(data);
    return await lastValueFrom(request);
  }

  public async deleteBoard(board: TaskBoard) {
    const request = this.taskBoardsApi.deleteBoard(board.uuid);
    return await lastValueFrom(request);
  }
}
