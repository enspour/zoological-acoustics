import { computed, inject, Injectable, resource } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { ProjectMembersApi } from './project-members.api';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectMembersService {
  private projectService = inject(ProjectService);
  private projectMembersApi = inject(ProjectMembersApi);

  private uuids = computed(() => this.projectService.project()?.uuid);

  private resource = resource({
    request: () => this.uuids(),
    loader: async ({ request }) => {
      if (!request) {
        return [];
      }

      const response = this.projectMembersApi.getMembersByProject(request);
      return await lastValueFrom(response);
    },
  });

  public members = computed(() => this.resource.value() || []);
  public error = this.resource.error;
  public isLoading = this.resource.isLoading;
}
