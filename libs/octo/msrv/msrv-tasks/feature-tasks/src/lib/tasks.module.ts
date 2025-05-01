import { Module } from '@nestjs/common';

import { MkPostgresModule } from '@meerkat-nest-pg';

import { KongTokenModule } from '@kong-nest-token';

import { TaskBoardsService } from './services/task-boards.service';
import { TaskColumnsService } from './services/task-columns.service';
import { TasksService } from './services/tasks.service';

import { TaskBoardEntity, TaskColumnEntity, TaskEntity } from './entities';

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
