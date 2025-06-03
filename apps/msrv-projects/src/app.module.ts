import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MkPostgresModule } from '@meerkat-nest-pg';

import { KongTokenModule } from '@kong-nest';

import {
  ProjectDataFieldEntity,
  ProjectDataValueEntity,
  ProjectEntity,
  ProjectMemberEntity,
  ProjectToDataValueEntity,
  ProjectToMemberEntity,
} from '@kraken/msrv-data-access-project-entities';

import { ProjectDataFieldsModule } from '@kraken/msrv-feature-project-data-fields';
import { ProjectMembersModule } from '@kraken/msrv-feature-project-members';
import { ProjectsModule } from '@kraken/msrv-feature-projects';

import { AppController } from './controllers/app.controller';
import { ProjectDataFieldsController } from './controllers/project-data-fields.controller';
import { ProjectDataValuesController } from './controllers/project-data-values.controller';
import { ProjectEventsController } from './controllers/project-events.controller';
import { ProjectMembersController } from './controllers/project-members.controller';
import { ProjectsController } from './controllers/projects.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MkPostgresModule.forRootAsync([
      ProjectEntity,
      ProjectDataFieldEntity,
      ProjectDataValueEntity,
      ProjectToDataValueEntity,
      ProjectMemberEntity,
      ProjectToMemberEntity,
    ]),
    KongTokenModule,
    ProjectsModule,
    ProjectDataFieldsModule,
    ProjectMembersModule,
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
