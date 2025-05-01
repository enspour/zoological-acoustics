import { Inject, Injectable, Type } from '@nestjs/common';

import { MkPostgresService } from '@meerkat-nest-pg';

import { User } from '@octo/domain';

@Injectable()
export class UserDuplicationService {
  constructor(
    @Inject('ENTITY') private entity: Type,
    private postgresService: MkPostgresService,
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
