import { computed, inject, Injectable, resource } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CreatableProject } from '@octo/domain';

import { ProjectsApi } from './projects.api';

@Injectable()
export class ProjectsService {
  private projectsApi = inject(ProjectsApi);

  private response = resource({
    loader: async () => {
      const response = this.projectsApi.getAll();
      return await lastValueFrom(response);
    },
  });

  public projects = computed(() => this.response.value() || []);
  public error = this.response.error;
  public isLoading = this.response.isLoading;

  public reload() {
    this.response.reload();
  }

  public async create(data: CreatableProject) {
    const request = this.projectsApi.create(data);
    return await lastValueFrom(request);
  }

  public async delete(uuid: string) {
    const request = this.projectsApi.delete(uuid);
    return await lastValueFrom(request);
  }
}
