import { Injectable } from '@nestjs/common';

import { User } from '@kudu/domain';
import { EventBusService } from '@kudu/msrv-util-event-bus';

@Injectable()
export class UserEventsService {
  constructor(private eventBusService: EventBusService) {}

  public notifyUserCreated(user: User) {
    return this.eventBusService.emit('user.created', { user });
  }

  public notifyUserUpdated(user: User) {
    return this.eventBusService.emit('user.updated', { user });
  }

  public notifyUserRemoved(user: User) {
    return this.eventBusService.emit('user.removed', { user });
  }
}
