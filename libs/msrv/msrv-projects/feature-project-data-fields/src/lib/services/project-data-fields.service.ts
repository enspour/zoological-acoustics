import { Injectable } from '@nestjs/common';

import {
  CreatableProjectDataField,
  NotFoundError,
  UpdatableProjectDataField,
} from '@kudu/domain';

import { PostgresService } from '@kudu/msrv-data-access-postgres';
import { ProjectDataFieldEntity } from '@kudu/msrv-data-access-project-entities';

@Injectable()
export class ProjectDataFieldsService {
  constructor(private postgresService: PostgresService) {}

  public async getAll() {
    return await this.postgresService.Manager.find(ProjectDataFieldEntity, {});
  }

  public async getOne(uuid: string) {
    return await this.postgresService.Manager.findOne(ProjectDataFieldEntity, {
      where: { uuid },
    });
  }

  public async create(data: CreatableProjectDataField) {
    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(ProjectDataFieldEntity, data);
  }

  public async update(data: UpdatableProjectDataField) {
    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(ProjectDataFieldEntity, data);
  }

  public async delete(uuid: string) {
    const df = await this.postgresService.Manager.findOne(
      ProjectDataFieldEntity,
      {
        where: { uuid },
      },
    );

    if (!df) {
      throw new NotFoundError('Проект не найден!');
    }

    const manager = this.postgresService.ManagerInTransaction;
    await manager.delete(ProjectDataFieldEntity, uuid);

    return df;
  }
}
