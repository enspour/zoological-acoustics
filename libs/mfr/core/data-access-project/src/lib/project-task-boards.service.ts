import { computed, inject, Injectable, resource } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CreatableTaskBoard, TaskBoard } from '@kudu/domain';

import { ProjectTaskBoardsApi } from './project-task-boards.api';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectTaskBoardsService {
  private projectService = inject(ProjectService);
  private projectTaskBoardsApi = inject(ProjectTaskBoardsApi);

  private uuids = computed(() => this.projectService.project()?.uuid);

  private resource = resource({
    request: () => this.uuids(),
    loader: async ({ request }) => {
      if (!request) {
        return [];
      }

      const response = this.projectTaskBoardsApi.getBoardsByProject(request);
      return lastValueFrom(response);
    },
  });

  public boards = this.resource.value;
  public error = this.resource.error;
  public isLoading = this.resource.isLoading;

  public async createBoard(data: CreatableTaskBoard) {
    const request = this.projectTaskBoardsApi.createBoard(data);
    return await lastValueFrom(request);
  }

  public async deleteBoard(board: TaskBoard) {
    const request = this.projectTaskBoardsApi.deleteBoard(board.uuid);
    return await lastValueFrom(request);
  }
}
