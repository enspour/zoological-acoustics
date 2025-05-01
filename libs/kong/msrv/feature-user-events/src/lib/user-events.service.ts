import { Injectable } from '@nestjs/common';

import { MkEventBusService } from '@meerkat-nest-event-bus';

import { User } from '@kong/domain';

@Injectable()
export class UserEventsService {
  constructor(private mkEventBusService: MkEventBusService) {}

  public notifyUserCreated(user: User) {
    return this.mkEventBusService.emit('user.created', { user });
  }

  public notifyUserUpdated(user: User) {
    return this.mkEventBusService.emit('user.updated', { user });
  }

  public notifyUserRemoved(user: User) {
    return this.mkEventBusService.emit('user.removed', { user });
  }
}
