import { ProjectDataFieldsApi } from './project-data-fields.api';
import { ProjectDataFieldsService } from './project-data-fields.service';

export const provideProjectDataFieldsDataAccess = () => [
  ProjectDataFieldsApi,
  ProjectDataFieldsService,
];
