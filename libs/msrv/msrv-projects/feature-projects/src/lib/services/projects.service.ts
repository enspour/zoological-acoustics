import { Injectable } from '@nestjs/common';

import {
  CreatableProject,
  NotFoundError,
  UnauthorizedError,
  UpdatableProject,
} from '@kudu/domain';

import { ProjectEventsService } from '@kudu/msrv-feature-project-events';
import { TokenService } from '@kudu/msrv-feature-token';

import { PostgresService } from '@kudu/msrv-data-access-postgres';
import { ProjectEntity } from '@kudu/msrv-data-access-project-entities';

@Injectable()
export class ProjectsService {
  constructor(
    private tokenService: TokenService,
    private postgresService: PostgresService,
    private projectEventsService: ProjectEventsService,
  ) {}

  public async getAll() {
    const token = this.tokenService.get();

    if (!token) {
      throw new UnauthorizedError();
    }

    const manager = this.postgresService.Manager;
    return await manager.find(ProjectEntity, {
      where: {
        members: {
          member: {
            uuid: token.sub,
          },
        },
      },
      relations: {
        dataValues: {
          value: true,
        },
      },
    });
  }

  public async getByUuid(uuid: string) {
    const token = this.tokenService.get();

    if (!token) {
      throw new UnauthorizedError();
    }

    const manager = this.postgresService.Manager;
    return await manager.findOne(ProjectEntity, {
      where: {
        uuid,
        members: {
          member: {
            uuid: token.sub,
          },
        },
      },
    });
  }

  public async create(data: CreatableProject) {
    const token = this.tokenService.get();

    if (!token) {
      throw new UnauthorizedError();
    }

    const manager = this.postgresService.ManagerInTransaction;
    const project = await manager.save(ProjectEntity, {
      ...data,
      createdByUuid: token.sub,
    });

    this.projectEventsService.notifyProjectCreated(project);

    return project;
  }

  public async update(data: UpdatableProject) {
    const manager = this.postgresService.ManagerInTransaction;
    const found = await manager.findOne(ProjectEntity, {
      where: { uuid: data.uuid },
    });

    if (!found) {
      throw new NotFoundError('Проект не найден!');
    }

    const project = await manager.save(ProjectEntity, data);

    this.projectEventsService.notifyProjectUpdated(project);

    return project;
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

    this.projectEventsService.notifyProjectRemoved(project);

    return project;
  }
}
