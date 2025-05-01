import { Module } from '@nestjs/common';

import { MkPostgresModule } from '@meerkat-nest-pg';

import {
  ProjectDataFieldEntity,
  ProjectDataValueEntity,
  ProjectToDataValueEntity,
} from '@octo/msrv-data-access-project-entities';

import { ProjectDataFieldsService } from './services/project-data-fields.service';
import { ProjectDataValuesService } from './services/project-data-values.service';

@Module({
  controllers: [],
  imports: [
    MkPostgresModule.forFeature([
      ProjectDataFieldEntity,
      ProjectDataValueEntity,
      ProjectToDataValueEntity,
    ]),
  ],
  providers: [ProjectDataFieldsService, ProjectDataValuesService],
  exports: [ProjectDataFieldsService, ProjectDataValuesService],
})
export class ProjectDataFieldsModule {}
