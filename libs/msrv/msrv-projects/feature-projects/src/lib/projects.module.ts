import { Module } from '@nestjs/common';

import { TokenModule } from '@kudu/msrv-feature-token';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';
import { ProjectEntity } from '@kudu/msrv-data-access-project-entities';

import { ProjectsService } from './services/projects.service';

@Module({
  imports: [PostgresModule.forFeature([ProjectEntity]), TokenModule],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
