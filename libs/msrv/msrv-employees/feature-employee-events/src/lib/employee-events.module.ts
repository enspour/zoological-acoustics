import { Module } from '@nestjs/common';

import { EventBusModule } from '@kudu/msrv-util-event-bus';

import { EmployeeEventsService } from './employee-events.service';

@Module({
  controllers: [],
  imports: [EventBusModule.forProvider({ queue: 'employees' })],
  providers: [EmployeeEventsService],
  exports: [EmployeeEventsService],
})
export class EmployeeEventsModule {}
