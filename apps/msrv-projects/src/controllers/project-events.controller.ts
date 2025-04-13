import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { Project } from '@kudu/domain';

import { ProjectMembersService } from '@kudu/msrv-feature-project-members';

@Controller()
export class ProjectEventsController {
  constructor(private projectMembersService: ProjectMembersService) {}

  @EventPattern('project.created')
  public async onProjectCreated(@Payload() payload: { project: Project }) {
    await this.projectMembersService.append(
      payload.project.uuid,
      payload.project.createdByUuid,
    );
  }
}
