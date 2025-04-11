import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';

import {
  TaskBoardEntity,
  TaskColumnEntity,
  TaskEntity,
  TasksModule,
} from '@kudu/msrv-feature-tasks';

import { TokenModule } from '@kudu/msrv-feature-token';

import { AppController } from './controllers/app.controller';
import { TaskBoardsController } from './controllers/task-boards.controller';
import { TaskColumnsController } from './controllers/task-columns.controller';
import { TasksController } from './controllers/tasks.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule.forRootAsync([
      TaskEntity,
      TaskBoardEntity,
      TaskColumnEntity,
    ]),
    TasksModule,
    TokenModule,
  ],
  controllers: [
    AppController,
    TasksController,
    TaskBoardsController,
    TaskColumnsController,
  ],
})
export class AppModule {}
