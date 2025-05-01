import { TaskBoardsApi } from './task-boards.api';
import { TaskBoardsService } from './task-boards.service';

export const provideTaskBoardsDataAccess = () => [
  TaskBoardsApi,
  TaskBoardsService,
];
