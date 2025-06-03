import { TasksApi } from './tasks.api';
import { TasksService } from './tasks.service';

export const provideTasksDataAccess = () => [TasksApi, TasksService];
