import { Injectable } from '@nestjs/common';

import { MkEventBusService } from '@meerkat-nest-event-bus';

import { KongUser } from '@kong-domain';

@Injectable()
export class UserEventsService {
  constructor(private mkEventBusService: MkEventBusService) {}

  public notifyUserCreated(user: KongUser) {
    return this.mkEventBusService.emit('user.created', { user });
  }

  public notifyUserUpdated(user: KongUser) {
    return this.mkEventBusService.emit('user.updated', { user });
  }

  public notifyUserRemoved(user: KongUser) {
    return this.mkEventBusService.emit('user.removed', { user });
  }
}
