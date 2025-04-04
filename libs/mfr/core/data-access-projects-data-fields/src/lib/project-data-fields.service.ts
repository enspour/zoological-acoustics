import { inject, Injectable, resource } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CreatableProjectDataField } from '@kudu/domain';

import { ProjectDataFieldsApi } from './project-data-fields.api';

@Injectable()
export class ProjectDataFieldsService {
  private projectDataFieldsApi = inject(ProjectDataFieldsApi);

  private response = resource({
    loader: async () => {
      const request = this.projectDataFieldsApi.getAll();
      return await lastValueFrom(request);
    },
  });

  public dataFields = this.response.value;
  public error = this.response.error;
  public isLoading = this.response.isLoading;

  public reload() {
    this.response.reload();
  }

  public async create(data: CreatableProjectDataField) {
    const request = this.projectDataFieldsApi.create(data);
    return await lastValueFrom(request);
  }
}
