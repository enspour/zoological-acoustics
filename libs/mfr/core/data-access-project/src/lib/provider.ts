import { ProjectTaskBoardsApi } from './project-task-boards.api';
import { ProjectTaskBoardsService } from './project-task-boards.service';
import { ProjectTaskColumnsApi } from './project-task-columns.api';
import { ProjectTaskColumnsService } from './project-task-columns.service';
import { ProjectTasksApi } from './project-tasks.api';
import { ProjectTasksService } from './project-tasks.service';
import { ProjectApi } from './project.api';
import { ProjectService } from './project.service';

export const provideProjectDataAccess = () => [
  ProjectApi,
  ProjectService,
  ProjectTaskBoardsApi,
  ProjectTaskBoardsService,
  ProjectTaskColumnsApi,
  ProjectTaskColumnsService,
  ProjectTasksApi,
  ProjectTasksService,
];
