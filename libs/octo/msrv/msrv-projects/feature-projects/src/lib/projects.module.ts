import { Module } from '@nestjs/common';

import { MkPostgresModule } from '@meerkat-nest-pg';

import { KongTokenModule } from '@kong-nest';

import { ProjectEntity } from '@octo/msrv-data-access-project-entities';

import { ProjectEventsModule } from '@octo/msrv-feature-project-events';

import { ProjectsService } from './services/projects.service';

@Module({
  imports: [
    MkPostgresModule.forFeature([ProjectEntity]),
    KongTokenModule,
    ProjectEventsModule,
  ],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
