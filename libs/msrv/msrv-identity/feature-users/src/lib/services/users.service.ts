import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreatableUser,
  CreatableUserCredentials,
  UpdatableUser,
} from '@kudu/domain';
import { PostgresService } from '@kudu/msrv-data-access-postgres';
import { UserEventsService } from '@kudu/msrv-feature-user-events';

import { UserCredentialsEntity, UserEntity } from '../entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
    private postgresService: PostgresService,
    private userEventsService: UserEventsService,
  ) {}

  public async get(uuid: string) {
    return await this.repository.findOne({
      where: { uuid },
    });
  }

  public async create(
    data: CreatableUser & { credentials: CreatableUserCredentials },
  ) {
    const manager = this.postgresService.Manager;

    const entity = manager.create(UserEntity, {
      ...data,
      credentials: manager.create(UserCredentialsEntity, {
        ...data.credentials,
      }),
    });

    entity.credentials.user = entity;

    const { credentials, ...user } = await manager.save(UserEntity, entity);

    this.userEventsService.notifyUserCreated(user);

    return user;
  }

  public async update(data: UpdatableUser) {
    const manager = this.postgresService.Manager;
    const user = await manager.save(UserEntity, data);

    this.userEventsService.notifyUserUpdated(user);

    return user;
  }

  public async remove(uuid: string) {
    const user = await this.get(uuid);

    if (!user) {
      return null;
    }

    const manager = this.postgresService.Manager;
    await manager.delete(UserEntity, uuid);

    this.userEventsService.notifyUserRemoved(user);

    return user;
  }
}
