import { ProjectApi } from './project.api';
import { ProjectService } from './project.service';

export const provideProjectDataAccess = () => [ProjectApi, ProjectService];
