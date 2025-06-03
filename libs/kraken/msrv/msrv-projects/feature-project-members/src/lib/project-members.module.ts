import { Module } from '@nestjs/common';

import { MkPostgresModule } from '@meerkat-nest-pg';
import {
  ProjectMemberEntity,
  ProjectToMemberEntity,
} from '@kraken/msrv-data-access-project-entities';

import { EmployeeDuplicationModule } from '@kraken/msrv-feature-employee-duplication';
import { UserDuplicationModule } from '@kraken/msrv-feature-user-duplication';

import { ProjectMembersService } from './services/project-members.service';

@Module({
  controllers: [],
  imports: [
    MkPostgresModule.forFeature([ProjectMemberEntity, ProjectToMemberEntity]),
    UserDuplicationModule.forRoot(ProjectMemberEntity),
    EmployeeDuplicationModule.forRoot(ProjectMemberEntity),
  ],
  providers: [ProjectMembersService],
  exports: [ProjectMembersService],
})
export class ProjectMembersModule {}
