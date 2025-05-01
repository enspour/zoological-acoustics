import { Module } from '@nestjs/common';

import { MkEventBusModule } from '@meerkat-nest-event-bus';

import { UserEventsService } from './user-events.service';

@Module({
  imports: [MkEventBusModule.forProvider({ queue: 'users' })],
  providers: [UserEventsService],
  exports: [UserEventsService],
})
export class UserEventsModule {}
