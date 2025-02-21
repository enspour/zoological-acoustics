import { Injectable } from '@nestjs/common';

import {
  CreatableUser,
  CreatableUserCredentials,
  NotFoundError,
  UpdatableUser,
} from '@kudu/domain';

import { PostgresService } from '@kudu/msrv-data-access-postgres';

import { UserEventsService } from '@kudu/msrv-feature-user-events';

import { UserCredentialsEntity, UserEntity } from '../entity';

@Injectable()
export class UsersService {
  constructor(
    private postgresService: PostgresService,
    private userEventsService: UserEventsService,
  ) {}

  public async get(uuid: string) {
    const manager = this.postgresService.Manager;
    return await manager.findOne(UserEntity, { where: { uuid } });
  }

  public async create(
    data: CreatableUser,
    credentials: CreatableUserCredentials,
  ) {
    return await this.postgresService.startTransaction(async () => {
      const manager = this.postgresService.Manager;

      const user = await manager.save(UserEntity, data);

      await manager.save(UserCredentialsEntity, {
        ...credentials,
        user,
      });

      this.userEventsService.notifyUserCreated(user);

      return user;
    });
  }

  public async update(data: UpdatableUser) {
    const manager = this.postgresService.Manager;

    const found = await manager.findOne(UserEntity, {
      where: { uuid: data.uuid },
    });

    if (!found) {
      throw new NotFoundError('Пользователь не найден!');
    }

    const user = await manager.save(UserEntity, data);

    this.userEventsService.notifyUserUpdated(user);

    return user;
  }

  public async remove(uuid: string) {
    const manager = this.postgresService.Manager;

    const user = await manager.findOne(UserEntity, {
      where: { uuid },
    });

    if (!user) {
      throw new NotFoundError('Пользователь не найден!');
    }

    await manager.delete(UserEntity, uuid);

    this.userEventsService.notifyUserRemoved(user);

    return user;
  }
}
