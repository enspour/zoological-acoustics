import { Injectable } from '@nestjs/common';

import { MkNotFoundError } from '@meerkat-nest-errors';
import { MkPostgresService } from '@meerkat-nest-pg';

import { CreatableTaskBoard } from '@octo/domain';

import { TaskBoardEntity } from '@octo/msrv-data-access-task-entities';

@Injectable()
export class TaskBoardsService {
  constructor(private postgresService: MkPostgresService) {}

  public async getByProject(projectUuid: string) {
    const manager = this.postgresService.Manager;
    return await manager.find(TaskBoardEntity, {
      where: { projectUuid },
    });
  }

  public async create(data: CreatableTaskBoard) {
    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(TaskBoardEntity, data);
  }

  public async delete(uuid: string) {
    const found = await this.postgresService.Manager.findOne(TaskBoardEntity, {
      where: { uuid },
    });

    if (!found) {
      throw new MkNotFoundError('Задача не найдена!');
    }

    const manager = this.postgresService.ManagerInTransaction;
    await manager.delete(TaskBoardEntity, uuid);

    return found;
  }
}
