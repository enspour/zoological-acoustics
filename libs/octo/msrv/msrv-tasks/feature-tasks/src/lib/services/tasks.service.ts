import { Injectable } from '@nestjs/common';
import { In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

import { MkNotFoundError, MkUnauthorizedError } from '@meerkat-nest-errors';
import { MkPostgresService } from '@meerkat-nest-pg';

import { KongTokenService } from '@kong-nest';

import { CreatableTask, UpdatableTask } from '@octo/domain';

import { TaskEntity } from '@octo/msrv-data-access-task-entities';

import { TasksQuery } from '../interfaces';

@Injectable()
export class TasksService {
  constructor(
    private postgresService: MkPostgresService,
    private tokenService: KongTokenService,
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
      throw new MkUnauthorizedError();
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
      throw new MkNotFoundError('Задача не найдена!');
    }

    return await manager.save(TaskEntity, data);
  }

  public async delete(uuid: string) {
    const found = await this.postgresService.Manager.findOne(TaskEntity, {
      where: { uuid },
    });

    if (!found) {
      throw new MkNotFoundError('Задача не найдена!');
    }

    const manager = this.postgresService.ManagerInTransaction;
    await manager.delete(TaskEntity, uuid);

    return found;
  }
}
