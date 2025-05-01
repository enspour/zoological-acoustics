import { Module } from '@nestjs/common';

import { MkPostgresModule } from '@meerkat-nest-pg';

import { KongTokenModule } from '@kong-nest';

import {
  TaskBoardEntity,
  TaskColumnEntity,
  TaskEntity,
} from '@octo/msrv-data-access-task-entities';

import { TaskBoardsService } from './services/task-boards.service';
import { TaskColumnsService } from './services/task-columns.service';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [
    MkPostgresModule.forFeature([
      TaskEntity,
      TaskBoardEntity,
      TaskColumnEntity,
    ]),
    KongTokenModule,
  ],
  providers: [TasksService, TaskBoardsService, TaskColumnsService],
  exports: [TasksService, TaskBoardsService, TaskColumnsService],
})
export class TasksModule {}
