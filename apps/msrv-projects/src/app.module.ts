import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';
import {
  ProjectDataFieldEntity,
  ProjectDataValueEntity,
  ProjectEntity,
  ProjectMemberEntity,
  ProjectToDataValueEntity,
  ProjectToMemberEntity,
} from '@kudu/msrv-data-access-project-entities';

import { ProjectDataFieldsModule } from '@kudu/msrv-feature-project-data-fields';
import { ProjectMembersModule } from '@kudu/msrv-feature-project-members';
import { ProjectsModule } from '@kudu/msrv-feature-projects';
import { TokenModule } from '@kudu/msrv-feature-token';

import { AppController } from './controllers/app.controller';
import { ProjectDataFieldsController } from './controllers/project-data-fields.controller';
import { ProjectDataValuesController } from './controllers/project-data-values.controller';
import { ProjectEventsController } from './controllers/project-events.controller';
import { ProjectMembersController } from './controllers/project-members.controller';
import { ProjectsController } from './controllers/projects.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule.forRootAsync([
      ProjectEntity,
      ProjectDataFieldEntity,
      ProjectDataValueEntity,
      ProjectToDataValueEntity,
      ProjectMemberEntity,
      ProjectToMemberEntity,
    ]),
    ProjectsModule,
    ProjectDataFieldsModule,
    ProjectMembersModule,
    TokenModule,
  ],
  controllers: [
    AppController,
    ProjectsController,
    ProjectDataFieldsController,
    ProjectDataValuesController,
    ProjectMembersController,
    ProjectEventsController,
  ],
})
export class AppModule {}
