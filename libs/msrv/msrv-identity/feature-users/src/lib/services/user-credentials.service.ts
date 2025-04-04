import { Injectable } from '@nestjs/common';

import { PostgresService } from '@kudu/msrv-data-access-postgres';

import { CreatableUserCredentials, User } from '@kudu/domain';
import { UserCredentialsEntity } from '../entity';

@Injectable()
export class UserCredentialsService {
  constructor(private postgresService: PostgresService) {}

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
