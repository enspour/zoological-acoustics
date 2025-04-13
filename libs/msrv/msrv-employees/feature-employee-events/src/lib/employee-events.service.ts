import { Injectable } from '@nestjs/common';

import { Employee } from '@kudu/domain';

import { EventBusService } from '@kudu/msrv-util-event-bus';

@Injectable()
export class EmployeeEventsService {
  constructor(private eventBusService: EventBusService) {}

  public notifyEmployeeUpdated(employee: Employee) {
    return this.eventBusService.emit('employee.updated', { employee });
  }
}
