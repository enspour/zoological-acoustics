import { Module } from '@nestjs/common';

import { TokenModule } from '@kudu/msrv-feature-token';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';
import { ProjectEntity } from '@kudu/msrv-data-access-project-entities';

import { ProjectEventsModule } from '@kudu/msrv-feature-project-events';

import { ProjectsService } from './services/projects.service';

@Module({
  imports: [
    TokenModule,
    PostgresModule.forFeature([ProjectEntity]),
    ProjectEventsModule,
  ],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
