import { inject, Injectable, resource } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CreatableProject } from '@kudu/domain';

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

  public projects = this.response.value;
  public error = this.response.error;
  public isLoading = this.response.isLoading;

  public reload() {
    this.response.reload();
  }

  public async create(data: CreatableProject) {
    const request = this.projectsApi.create(data);
    const project = await lastValueFrom(request);

    const projects = this.projects();
    if (projects) {
      this.response.set([...projects, project]);
    }

    return project;
  }

  public async delete(uuid: string) {
    const request = this.projectsApi.delete(uuid);
    const project = await lastValueFrom(request);

    const projects = this.projects();
    if (projects) {
      this.response.set(projects.filter((p) => p.uuid !== uuid));
    }

    return project;
  }
}
