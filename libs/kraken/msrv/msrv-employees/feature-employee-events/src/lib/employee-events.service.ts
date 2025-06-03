import { Injectable } from '@nestjs/common';

import { Employee } from '@kraken/domain';

import { MkEventBusService } from '@meerkat-nest-event-bus';

@Injectable()
export class EmployeeEventsService {
  constructor(private eventBusService: MkEventBusService) {}

  public notifyEmployeeUpdated(employee: Employee) {
    return this.eventBusService.emit('employee.updated', { employee });
  }
}
