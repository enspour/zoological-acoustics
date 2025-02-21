import { inject, Injectable, resource, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { ProjectApi } from './project.api';

@Injectable()
export class ProjectService {
  private projectApi = inject(ProjectApi);

  private uuid = signal<string>('');

  private resource = resource({
    request: () => this.uuid(),
    loader: async ({ request }) => {
      const response = this.projectApi.getByUuid(request);
      return lastValueFrom(response);
    },
  });

  public project = this.resource.value;
  public error = this.resource.error;
  public isLoading = this.resource.isLoading;

  public setProject(uuid: string) {
    this.uuid.set(uuid);
  }
}
