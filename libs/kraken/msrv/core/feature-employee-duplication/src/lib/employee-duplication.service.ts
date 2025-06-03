import { Inject, Injectable, Type } from '@nestjs/common';

import { MkPostgresService } from '@meerkat-nest-pg';

import { Employee } from '@kraken/domain';

@Injectable()
export class EmployeeDuplicationService {
  constructor(
    @Inject('ENTITY') private entity: Type,
    private postgresService: MkPostgresService,
  ) {}

  public async update(employee: Employee) {
    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(this.entity, employee);
  }
}
