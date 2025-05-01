import { Injectable } from '@nestjs/common';

import { MkPostgresService } from '@meerkat-nest-pg';

import { CreatableUserCredentials, User } from '@kong/domain';

import { UserCredentialsEntity } from '@kong/msrv-data-access-entities';

@Injectable()
export class UserCredentialsService {
  constructor(private postgresService: MkPostgresService) {}

  public async getByUsername(username: string) {
    const manager = this.postgresService.Manager;
    return await manager.findOne(UserCredentialsEntity, {
      where: { username },
      relations: { user: true },
    });
  }

  public async create(data: CreatableUserCredentials, user: User) {
    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(UserCredentialsEntity, { ...data, user });
  }
}
