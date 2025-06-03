import { Module } from '@nestjs/common';

import { MkEventBusModule } from '@meerkat-nest-event-bus';

import { EmployeeEventsService } from './employee-events.service';

@Module({
  controllers: [],
  imports: [MkEventBusModule.forProvider({ queue: 'employees' })],
  providers: [EmployeeEventsService],
  exports: [EmployeeEventsService],
})
export class EmployeeEventsModule {}
