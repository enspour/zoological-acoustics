import { Injectable } from '@nestjs/common';

import {
  CreatableProject,
  NotFoundError,
  UnauthorizedError,
  UpdatableProject,
} from '@kudu/domain';

import { TokenService } from '@kudu/msrv-feature-token';

import { PostgresService } from '@kudu/msrv-data-access-postgres';
import { ProjectEntity } from '@kudu/msrv-data-access-project-entities';

@Injectable()
export class ProjectsService {
  constructor(
    private postgresService: PostgresService,
    private tokenService: TokenService,
  ) {}

  public async getAll() {
    const manager = this.postgresService.Manager;
    return await manager.find(ProjectEntity, {
      relations: {
        dfs: {
          value: true,
        },
      },
    });
  }

  public async getByUuid(uuid: string) {
    const manager = this.postgresService.Manager;
    return await manager.findOne(ProjectEntity, { where: { uuid } });
  }

  public async create(data: CreatableProject) {
    const token = this.tokenService.get();

    if (!token) {
      throw new UnauthorizedError();
    }

    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(ProjectEntity, {
      ...data,
      createdByUuid: token.sub,
    });
  }

  public async update(data: UpdatableProject) {
    const manager = this.postgresService.ManagerInTransaction;

    const project = await manager.findOne(ProjectEntity, {
      where: { uuid: data.uuid },
    });

    if (!project) {
      throw new NotFoundError('Проект не найден!');
    }

    return await manager.save(ProjectEntity, data);
  }

  public async delete(uuid: string) {
    const project = await this.postgresService.Manager.findOne(ProjectEntity, {
      where: { uuid },
    });

    if (!project) {
      throw new NotFoundError('Проект не найден!');
    }

    const manager = this.postgresService.ManagerInTransaction;
    await manager.delete(ProjectEntity, uuid);

    return project;
  }
}
