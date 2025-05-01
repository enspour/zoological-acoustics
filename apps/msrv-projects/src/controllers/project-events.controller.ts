import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { KongAuthGuard } from '@kong-nest';

import { Project } from '@octo/domain';

import { ProjectMembersService } from '@octo/msrv-feature-project-members';

@Controller()
@UseGuards(KongAuthGuard)
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
