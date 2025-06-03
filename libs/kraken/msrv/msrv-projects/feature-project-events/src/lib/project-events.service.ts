import { Injectable } from '@nestjs/common';

import { Project } from '@kraken/domain';

import { MkEventBusService } from '@meerkat-nest-event-bus';

@Injectable()
export class ProjectEventsService {
  constructor(private eventBusService: MkEventBusService) {}

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
