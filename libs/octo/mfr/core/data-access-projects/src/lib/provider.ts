import { ProjectsApi } from './projects.api';
import { ProjectsService } from './projects.service';

export const provideProjectsDataAccess = () => [ProjectsApi, ProjectsService];
