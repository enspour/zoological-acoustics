import { Injectable } from '@nestjs/common';

import { PostgresService } from '@kudu/msrv-data-access-postgres';

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
}
