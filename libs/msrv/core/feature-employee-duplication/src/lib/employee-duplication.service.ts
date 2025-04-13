import { Inject, Injectable, Type } from '@nestjs/common';

import { Employee } from '@kudu/domain';

import { PostgresService } from '@kudu/msrv-data-access-postgres';

@Injectable()
export class EmployeeDuplicationService {
  constructor(
    @Inject('ENTITY') private entity: Type,
    private postgresService: PostgresService,
  ) {}

  public async update(employee: Employee) {
    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(this.entity, employee);
  }
}
