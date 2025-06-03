import { ProjectMembersApi } from './project-members.api';
import { ProjectMembersService } from './project-members.service';
import { ProjectTaskBoardsService } from './project-task-boards.service';
import { ProjectTaskColumnsService } from './project-task-columns.service';
import { ProjectTasksService } from './project-tasks.service';
import { ProjectApi } from './project.api';
import { ProjectService } from './project.service';

export const provideProjectDataAccess = () => [
  ProjectApi,
  ProjectService,
  ProjectTaskBoardsService,
  ProjectTaskColumnsService,
  ProjectTasksService,
  ProjectMembersApi,
  ProjectMembersService,
];
