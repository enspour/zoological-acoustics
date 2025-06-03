import { Module } from '@nestjs/common';

import { MkEventBusModule } from '@meerkat-nest-event-bus';

import { ProjectEventsService } from './project-events.service';

@Module({
  controllers: [],
  imports: [MkEventBusModule.forProvider({ queue: 'projects' })],
  providers: [ProjectEventsService],
  exports: [ProjectEventsService],
})
export class ProjectEventsModule {}
