import { Injectable } from '@nestjs/common';
import { In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import {
  CreatableTask,
  NotFoundError,
  UnauthorizedError,
  UpdatableTask,
} from '@kudu/domain';

import { PostgresService } from '@kudu/msrv-data-access-postgres';

import { TokenService } from '@kudu/msrv-feature-token';

import { TaskEntity } from '../entities';
import { TasksQuery } from '../interfaces';

@Injectable()
export class TasksService {
  constructor(
    private postgresService: PostgresService,
    private tokenService: TokenService,
  ) {}

  public async getByQuery(query: TasksQuery) {
    const manager = this.postgresService.Manager;
    return await manager.find(TaskEntity, {
      where: {
        startDate: query.startDate && MoreThanOrEqual(query.startDate),
        endDate: query.endDate && LessThanOrEqual(query.endDate),
        boardUuid: query.boardUuids && In(query.boardUuids),
        board: {
          projectUuid: query.projectUuids && In(query.projectUuids),
        },
      },
    });
  }

  public async getByUuid(uuid: string) {
    const manager = this.postgresService.Manager;
    return await manager.findOne(TaskEntity, { where: { uuid } });
  }

  public async create(data: CreatableTask) {
    const token = this.tokenService.get();

    if (!token) {
      throw new UnauthorizedError();
    }

    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(TaskEntity, {
      ...data,
      createdByUuid: token.sub,
    });
  }

  public async update(data: UpdatableTask) {
    const manager = this.postgresService.ManagerInTransaction;

    const found = await manager.findOne(TaskEntity, {
      where: { uuid: data.uuid },
    });

    if (!found) {
      throw new NotFoundError('Задача не найдена!');
    }

    return await manager.save(TaskEntity, data);
  }

  public async delete(uuid: string) {
    const found = await this.postgresService.Manager.findOne(TaskEntity, {
      where: { uuid },
    });

    if (!found) {
      throw new NotFoundError('Задача не найдена!');
    }

    const manager = this.postgresService.ManagerInTransaction;
    await manager.delete(TaskEntity, uuid);

    return found;
  }
}
