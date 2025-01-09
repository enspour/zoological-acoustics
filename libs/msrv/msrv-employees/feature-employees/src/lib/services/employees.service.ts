import { Injectable } from '@nestjs/common';

import { UpdatableEmployee } from '@kudu/domain';
import { PostgresService } from '@kudu/msrv-data-access-postgres';

import { EmployeeEntity } from '../entities';

@Injectable()
export class EmployeesService {
  constructor(private postgresService: PostgresService) {}

  public async getAll() {
    const manager = this.postgresService.Manager;
    return await manager.find(EmployeeEntity);
  }

  public async getByUuid(uuid: string) {
    const manager = this.postgresService.Manager;
    return await manager.findOne(EmployeeEntity, {
      where: { uuid },
    });
  }

  public async update(data: UpdatableEmployee) {
    const manager = this.postgresService.Manager;
    return await manager.save(EmployeeEntity, data);
  }
}
