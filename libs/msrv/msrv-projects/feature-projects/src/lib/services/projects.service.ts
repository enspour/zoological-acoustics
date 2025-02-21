import { Injectable } from '@nestjs/common';

import {
  CreatableProject,
  NotFoundError,
  UpdatableProject,
} from '@kudu/domain';

import { PostgresService } from '@kudu/msrv-data-access-postgres';

import { ProjectEntity } from '../entities';

@Injectable()
export class ProjectsService {
  constructor(private postgresService: PostgresService) {}

  public async getAll() {
    const manager = this.postgresService.Manager;
    return manager.find(ProjectEntity);
  }

  public async getByUuid(uuid: string) {
    const manager = this.postgresService.Manager;
    return manager.findOne(ProjectEntity, { where: { uuid } });
  }

  public async create(data: CreatableProject) {
    const manager = this.postgresService.Manager;
    return manager.save(ProjectEntity, data);
  }

  public async update(data: UpdatableProject) {
    const manager = this.postgresService.Manager;

    const project = await manager.findOne(ProjectEntity, {
      where: { uuid: data.uuid },
    });

    if (!project) {
      throw new NotFoundError('Проект не найден!');
    }

    return manager.save(ProjectEntity, data);
  }

  public async delete(uuid: string) {
    const manager = this.postgresService.Manager;

    const project = await manager.findOne(ProjectEntity, { where: { uuid } });

    if (!project) {
      throw new NotFoundError('Проект не найден!');
    }

    manager.delete(ProjectEntity, uuid);

    return project;
  }
}
