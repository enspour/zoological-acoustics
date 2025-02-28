import { computed, inject, Injectable, resource } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CreatableTask } from '@kudu/domain';

import { ProjectTasksApi } from './project-tasks.api';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectTasksService {
  private projectTasksApi = inject(ProjectTasksApi);
  private projectService = inject(ProjectService);

  private uuids = computed(() => this.projectService.project()?.uuid);

  private resource = resource({
    request: () => this.uuids(),
    loader: async ({ request }) => {
      if (!request) {
        return [];
      }

      const response = this.projectTasksApi.getByProject(request);
      return lastValueFrom(response);
    },
  });

  public tasks = this.resource.value;
  public error = this.resource.error;
  public isLoading = this.resource.isLoading;

  public async createTask(data: CreatableTask) {
    const request = this.projectTasksApi.createTask(data);
    return await lastValueFrom(request);
  }
}
