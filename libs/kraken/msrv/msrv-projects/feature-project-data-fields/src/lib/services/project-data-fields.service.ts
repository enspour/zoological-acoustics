import { Injectable } from '@nestjs/common';

import { MkNotFoundError } from '@meerkat-nest-errors';
import { MkPostgresService } from '@meerkat-nest-pg';

import {
  CreatableProjectDataField,
  UpdatableProjectDataField,
} from '@kraken/domain';

import { ProjectDataFieldEntity } from '@kraken/msrv-data-access-project-entities';

@Injectable()
export class ProjectDataFieldsService {
  constructor(private postgresService: MkPostgresService) {}

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
      throw new MkNotFoundError('Проект не найден!');
    }

    const manager = this.postgresService.ManagerInTransaction;
    await manager.delete(ProjectDataFieldEntity, uuid);

    return df;
  }
}
