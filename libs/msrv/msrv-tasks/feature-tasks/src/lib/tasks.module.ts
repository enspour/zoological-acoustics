import { Module } from '@nestjs/common';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';

import { TokenModule } from '@kudu/msrv-feature-token';

import { TaskBoardsService } from './services/task-boards.service';
import { TasksService } from './services/tasks.service';

import { TaskBoardEntity, TaskColumnEntity, TaskEntity } from './entities';
import { TaskColumnsService } from './services/task-columns.service';

@Module({
  imports: [
    PostgresModule.forFeature([TaskEntity, TaskBoardEntity, TaskColumnEntity]),
    TokenModule,
  ],
  providers: [TasksService, TaskBoardsService, TaskColumnsService],
  exports: [TasksService, TaskBoardsService, TaskColumnsService],
})
export class TasksModule {}
