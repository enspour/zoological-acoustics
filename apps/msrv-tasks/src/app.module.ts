import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MkPostgresModule } from '@meerkat-nest-pg';

import { KongTokenModule } from '@kong-nest';

import { TasksModule } from '@octo/msrv-feature-tasks';

import {
  TaskBoardEntity,
  TaskColumnEntity,
  TaskEntity,
} from '@octo/msrv-data-access-task-entities';

import { AppController } from './controllers/app.controller';
import { TaskBoardsController } from './controllers/task-boards.controller';
import { TaskColumnsController } from './controllers/task-columns.controller';
import { TasksController } from './controllers/tasks.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MkPostgresModule.forRootAsync([
      TaskEntity,
      TaskBoardEntity,
      TaskColumnEntity,
    ]),
    KongTokenModule,
    TasksModule,
  ],
  controllers: [
    AppController,
    TasksController,
    TaskBoardsController,
    TaskColumnsController,
  ],
})
export class AppModule {}
