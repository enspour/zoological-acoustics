import { Injectable } from '@nestjs/common';

import { Project } from '@kudu/domain';

import { EventBusService } from '@kudu/msrv-util-event-bus';

@Injectable()
export class ProjectEventsService {
  constructor(private eventBusService: EventBusService) {}

  public notifyProjectCreated(project: Project) {
    return this.eventBusService.emit('project.created', { project });
  }

  public notifyProjectUpdated(project: Project) {
    return this.eventBusService.emit('project.updated', { project });
  }

  public notifyProjectRemoved(project: Project) {
    return this.eventBusService.emit('project.removed', { project });
  }
}
