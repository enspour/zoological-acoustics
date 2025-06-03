import { Injectable } from '@angular/core';

import { MkNotFoundError } from '@meerkat-nest-errors';
import { MkPostgresService } from '@meerkat-nest-pg';

import { CreatableTaskColumn } from '@kraken/domain';

import { TaskColumnEntity } from '@kraken/msrv-data-access-task-entities';

@Injectable()
export class TaskColumnsService {
  constructor(private postgresService: MkPostgresService) {}

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
      throw new MkNotFoundError('Задача не найдена!');
    }

    const manager = this.postgresService.ManagerInTransaction;
    await manager.delete(TaskColumnEntity, uuid);

    return found;
  }
}
