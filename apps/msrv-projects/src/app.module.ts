import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';
import { ProjectEntity, ProjectsModule } from '@kudu/msrv-feature-projects';

import { AppController } from './controllers/app.controller';
import { ProjectsController } from './controllers/projects.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule.forRootAsync([ProjectEntity]),
    ProjectsModule,
  ],
  controllers: [AppController, ProjectsController],
})
export class AppModule {}
