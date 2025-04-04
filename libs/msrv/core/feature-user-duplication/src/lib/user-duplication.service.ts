import { Inject, Injectable, Type } from '@nestjs/common';

import { User } from '@kudu/domain';

import { PostgresService } from '@kudu/msrv-data-access-postgres';

@Injectable()
export class UserDuplicationService {
  constructor(
    @Inject('ENTITY') private entity: Type,
    private postgresService: PostgresService,
  ) {}

  public async create(user: User) {
    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(this.entity, user);
  }

  public async update(user: User) {
    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(this.entity, user);
  }

  public async remove(user: User) {
    const manager = this.postgresService.ManagerInTransaction;
    await manager.delete(this.entity, user.uuid);
  }
}
