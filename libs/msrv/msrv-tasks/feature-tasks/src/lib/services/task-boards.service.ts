import { Injectable } from '@nestjs/common';

import { CreatableTaskBoard, NotFoundError } from '@kudu/domain';

import { PostgresService } from '@kudu/msrv-data-access-postgres';
import { TaskBoardEntity } from '../entities/task-board.entity';

@Injectable()
export class TaskBoardsService {
  constructor(private postgresService: PostgresService) {}

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
      throw new NotFoundError('Задача не найдена!');
    }

    const manager = this.postgresService.ManagerInTransaction;
    await manager.delete(TaskBoardEntity, uuid);

    return found;
  }
}
