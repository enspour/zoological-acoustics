import { Injectable } from '@angular/core';

import { CreatableTaskColumn, NotFoundError } from '@kudu/domain';

import { PostgresService } from '@kudu/msrv-data-access-postgres';

import { TaskColumnEntity } from '../entities';

@Injectable()
export class TaskColumnsService {
  constructor(private postgresService: PostgresService) {}

  public async getByBoard(boardUuid: string) {
    const manager = this.postgresService.Manager;
    return await manager.find(TaskColumnEntity, {
      where: { boardUuid },
    });
  }

  public async getByProject(projectUuid: string) {
    const manager = this.postgresService.Manager;
    return await manager.find(TaskColumnEntity, {
      where: {
        board: {
          projectUuid,
        },
      },
    });
  }

  public async create(data: CreatableTaskColumn) {
    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(TaskColumnEntity, data);
  }

  public async delete(uuid: string) {
    const found = await this.postgresService.Manager.findOne(TaskColumnEntity, {
      where: { uuid },
    });

    if (!found) {
      throw new NotFoundError('Задача не найдена!');
    }

    const manager = this.postgresService.ManagerInTransaction;
    await manager.delete(TaskColumnEntity, uuid);

    return found;
  }
}
