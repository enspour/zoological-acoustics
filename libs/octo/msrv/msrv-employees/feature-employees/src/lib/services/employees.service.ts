import { Injectable } from '@nestjs/common';

import { UpdatableEmployee } from '@octo/domain';

import { MkPostgresService } from '@meerkat-nest-pg';

import { EmployeeEventsService } from '@octo/msrv-feature-employee-events';

import { EmployeeEntity } from '@octo/msrv-data-access-employee-entities';

@Injectable()
export class EmployeesService {
  constructor(
    private postgresService: MkPostgresService,
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
