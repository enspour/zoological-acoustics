import { computed, inject, Injectable, resource } from '@angular/core';

import { TasksService } from '@kudu/mfr-data-access-tasks';

import { ProjectService } from './project.service';

@Injectable()
export class ProjectTasksService {
  private projectService = inject(ProjectService);
  private tasksService = inject(TasksService);

  private uuids = computed(() => this.projectService.project()?.uuid);

  private resource = resource({
    request: () => this.uuids(),
    loader: async ({ request }) => {
      if (!request) {
        return [];
      }

      return await this.tasksService.getByProject(request);
    },
  });

  public tasks = this.resource.value;
  public error = this.resource.error;
  public isLoading = this.resource.isLoading;
}
