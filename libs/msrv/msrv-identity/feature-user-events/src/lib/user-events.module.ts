import { Module } from '@nestjs/common';

import { EventBusModule } from '@kudu/msrv-util-event-bus';

import { UserEventsService } from './user-events.service';

@Module({
  imports: [EventBusModule.forProvider({ queue: 'users' })],
  providers: [UserEventsService],
  exports: [UserEventsService],
})
export class UserEventsModule {}
