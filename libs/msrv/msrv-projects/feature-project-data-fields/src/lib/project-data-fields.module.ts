import { Module } from '@nestjs/common';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';

import {
  ProjectDataFieldEntity,
  ProjectDataValueEntity,
  ProjectToDataFieldEntity,
} from '@kudu/msrv-data-access-project-entities';

import { ProjectDataFieldsService } from './services/project-data-fields.service';
import { ProjectDataValuesService } from './services/project-data-values.service';

@Module({
  controllers: [],
  imports: [
    PostgresModule.forFeature([
      ProjectDataFieldEntity,
      ProjectDataValueEntity,
      ProjectToDataFieldEntity,
    ]),
  ],
  providers: [ProjectDataFieldsService, ProjectDataValuesService],
  exports: [ProjectDataFieldsService, ProjectDataValuesService],
})
export class ProjectDataFieldsModule {}
