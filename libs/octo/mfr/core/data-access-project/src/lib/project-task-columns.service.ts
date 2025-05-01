import { computed, inject, Injectable, resource } from '@angular/core';

import { TaskColumnsService } from '@octo/mfr-data-access-task-columns';

import { ProjectService } from './project.service';

@Injectable()
export class ProjectTaskColumnsService {
  private projectService = inject(ProjectService);
  private taskColumnsService = inject(TaskColumnsService);

  private uuids = computed(() => this.projectService.project()?.uuid);

  private resource = resource({
    request: () => this.uuids(),
    loader: async ({ request }) => {
      if (!request) {
        return [];
      }

      return await this.taskColumnsService.getColumnsByProject(request);
    },
  });

  public columns = computed(() => this.resource.value() || []);
  public error = this.resource.error;
  public isLoading = this.resource.isLoading;
}
