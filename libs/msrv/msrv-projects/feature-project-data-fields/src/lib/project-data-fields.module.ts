import { Module } from '@nestjs/common';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';

import {
  ProjectDataFieldEntity,
  ProjectDataValueEntity,
  ProjectToDataValueEntity,
} from '@kudu/msrv-data-access-project-entities';

import { ProjectDataFieldsService } from './services/project-data-fields.service';
import { ProjectDataValuesService } from './services/project-data-values.service';

@Module({
  controllers: [],
  imports: [
    PostgresModule.forFeature([
      ProjectDataFieldEntity,
      ProjectDataValueEntity,
      ProjectToDataValueEntity,
    ]),
  ],
  providers: [ProjectDataFieldsService, ProjectDataValuesService],
  exports: [ProjectDataFieldsService, ProjectDataValuesService],
})
export class ProjectDataFieldsModule {}
