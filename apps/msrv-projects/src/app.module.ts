import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';
import {
  ProjectDataFieldEntity,
  ProjectDataValueEntity,
  ProjectEntity,
  ProjectToDataFieldEntity,
} from '@kudu/msrv-data-access-project-entities';

import { ProjectDataFieldsModule } from '@kudu/msrv-feature-project-data-fields';
import { ProjectsModule } from '@kudu/msrv-feature-projects';

import { TokenModule } from '@kudu/msrv-util-token';

import { AppController } from './controllers/app.controller';
import { ProjectDataFieldsController } from './controllers/project-data-fields.controller';
import { ProjectDataValuesController } from './controllers/project-data-values.controller';
import { ProjectsController } from './controllers/projects.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule.forRootAsync([
      ProjectEntity,
      ProjectDataFieldEntity,
      ProjectDataValueEntity,
      ProjectToDataFieldEntity,
    ]),
    ProjectsModule,
    ProjectDataFieldsModule,
    TokenModule,
  ],
  controllers: [
    AppController,
    ProjectsController,
    ProjectDataFieldsController,
    ProjectDataValuesController,
  ],
})
export class AppModule {}
