import { TaskColumnsApi } from './task-columns.api';
import { TaskColumnsService } from './task-columns.service';

export const provideTaskColumnsDataAccess = () => [
  TaskColumnsApi,
  TaskColumnsService,
];
