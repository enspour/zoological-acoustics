import { Module } from '@nestjs/common';

import { EventBusModule } from '@kudu/msrv-util-event-bus';

import { ProjectEventsService } from './project-events.service';

@Module({
  controllers: [],
  imports: [EventBusModule.forProvider({ queue: 'projects' })],
  providers: [ProjectEventsService],
  exports: [ProjectEventsService],
})
export class ProjectEventsModule {}
