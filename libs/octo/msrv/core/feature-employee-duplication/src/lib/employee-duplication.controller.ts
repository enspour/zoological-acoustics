import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { Employee } from '@octo/domain';

import { EmployeeDuplicationService } from './employee-duplication.service';

@Controller()
export class EmployeeDuplicationController {
  constructor(private employeeDuplicationService: EmployeeDuplicationService) {}

  @EventPattern('employee.updated')
  public async onUserUpdated(@Payload() payload: { employee: Employee }) {
    await this.employeeDuplicationService.update(payload.employee);
  }
}
