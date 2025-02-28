import { computed, inject, Injectable, resource } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CreatableTaskColumn } from '@kudu/domain';

import { ProjectTaskColumnsApi } from './project-task-columns.api';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectTaskColumnsService {
  private projectService = inject(ProjectService);
  private projectTaskColumnsApi = inject(ProjectTaskColumnsApi);

  private uuids = computed(() => this.projectService.project()?.uuid);

  private resource = resource({
    request: () => this.uuids(),
    loader: async ({ request }) => {
      if (!request) {
        return [];
      }

      const response = this.projectTaskColumnsApi.getColumnsByProject(request);
      return lastValueFrom(response);
    },
  });

  public columns = this.resource.value;
  public error = this.resource.error;
  public isLoading = this.resource.isLoading;

  public async createColumn(column: CreatableTaskColumn) {
    const request = this.projectTaskColumnsApi.createColumn(column);
    return await lastValueFrom(request);
  }
}
