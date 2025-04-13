import { Injectable } from '@nestjs/common';

import { UpdatableEmployee } from '@kudu/domain';

import { PostgresService } from '@kudu/msrv-data-access-postgres';

import { EmployeeEventsService } from '@kudu/msrv-feature-employee-events';

import { EmployeeEntity } from '../entities';

@Injectable()
export class EmployeesService {
  constructor(
    private postgresService: PostgresService,
    private employeeEventsService: EmployeeEventsService,
  ) {}

  public async getAll() {
    const manager = this.postgresService.ManagerInTransaction;
    return await manager.find(EmployeeEntity);
  }

  public async getByUuid(uuid: string) {
    const manager = this.postgresService.ManagerInTransaction;
    return await manager.findOne(EmployeeEntity, {
      where: { uuid },
    });
  }

  public async update(data: UpdatableEmployee) {
    const manager = this.postgresService.ManagerInTransaction;
    const employee = await manager.save(EmployeeEntity, data);

    this.employeeEventsService.notifyEmployeeUpdated(employee);

    return employee;
  }
}
