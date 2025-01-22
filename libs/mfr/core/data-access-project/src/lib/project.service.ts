import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { ProjectApi } from './project.api';

@Injectable()
export class ProjectService {
  private projectApi = inject(ProjectApi);

  public async getByUuid(uuid: string) {
    const request = this.projectApi.getByUuid(uuid);
    return lastValueFrom(request);
  }
}
