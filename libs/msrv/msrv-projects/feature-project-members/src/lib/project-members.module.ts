import { Module } from '@nestjs/common';

import { PostgresModule } from '@kudu/msrv-data-access-postgres';
import {
  ProjectMemberEntity,
  ProjectToMemberEntity,
} from '@kudu/msrv-data-access-project-entities';

import { EmployeeDuplicationModule } from '@kudu/msrv-feature-employee-duplication';
import { UserDuplicationModule } from '@kudu/msrv-feature-user-duplication';

import { ProjectMembersService } from './services/project-members.service';

@Module({
  controllers: [],
  imports: [
    PostgresModule.forFeature([ProjectMemberEntity, ProjectToMemberEntity]),
    UserDuplicationModule.forRoot(ProjectMemberEntity),
    EmployeeDuplicationModule.forRoot(ProjectMemberEntity),
  ],
  providers: [ProjectMembersService],
  exports: [ProjectMembersService],
})
export class ProjectMembersModule {}
