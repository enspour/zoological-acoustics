import { computed, inject, Injectable, resource } from '@angular/core';

import { TaskBoardsService } from '@kraken/mfr-data-access-task-boards';

import { ProjectService } from './project.service';

@Injectable()
export class ProjectTaskBoardsService {
  private projectService = inject(ProjectService);
  private taskBoardsService = inject(TaskBoardsService);

  private uuids = computed(() => this.projectService.project()?.uuid);

  private resource = resource({
    request: () => this.uuids(),
    loader: async ({ request }) => {
      if (!request) {
        return [];
      }

      return await this.taskBoardsService.getBoardsByProject(request);
    },
  });

  public boards = computed(() => this.resource.value() || []);
  public error = this.resource.error;
  public isLoading = this.resource.isLoading;
}
