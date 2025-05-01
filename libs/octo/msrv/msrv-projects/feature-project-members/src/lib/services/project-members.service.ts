import { Injectable } from '@nestjs/common';

import { MkNotFoundError } from '@meerkat-nest-errors';
import { MkPostgresService } from '@meerkat-nest-pg';

import {
  ProjectEntity,
  ProjectMemberEntity,
  ProjectToMemberEntity,
} from '@octo/msrv-data-access-project-entities';

@Injectable()
export class ProjectMembersService {
  constructor(private postgresService: MkPostgresService) {}

  public async getAll(projectUuid: string) {
    const project = await this.postgresService.Manager.findOne(ProjectEntity, {
      where: { uuid: projectUuid },
      relations: {
        members: {
          member: true,
        },
      },
    });

    if (!project) {
      throw new MkNotFoundError('Проект не найден!');
    }

    return project.members.map(({ member }) => member);
  }

  public async append(projectUuid: string, memberUuid: string) {
    const project = await this.postgresService.Manager.findOne(ProjectEntity, {
      where: { uuid: projectUuid },
      relations: {
        members: {
          member: true,
        },
      },
    });

    if (!project) {
      throw new MkNotFoundError('Проект не найден!');
    }

    const member = await this.postgresService.Manager.findOne(
      ProjectMemberEntity,
      {
        where: { uuid: memberUuid },
      },
    );

    if (!member) {
      throw new MkNotFoundError('Участник не найден!');
    }

    if (project.members.some((m) => m.member.uuid === member.uuid)) {
      return member;
    }

    const manager = this.postgresService.ManagerInTransaction;
    await manager.save(ProjectToMemberEntity, {
      project,
      member,
    });

    return member;
  }

  public async remove(projectUuid: string, memberUuid: string) {
    const project = await this.postgresService.Manager.findOne(ProjectEntity, {
      where: { uuid: projectUuid },
      relations: {
        members: {
          member: true,
        },
      },
    });

    if (!project) {
      throw new MkNotFoundError('Проект не найден!');
    }

    const member = await this.postgresService.Manager.findOne(
      ProjectMemberEntity,
      {
        where: { uuid: memberUuid },
      },
    );

    if (!member) {
      throw new MkNotFoundError('Участник не найден!');
    }

    if (!project.members.some((m) => m.member.uuid === member.uuid)) {
      return member;
    }

    const manager = this.postgresService.ManagerInTransaction;
    await manager.delete(ProjectToMemberEntity, {
      projectUuid: project.uuid,
      memberUuid: member.uuid,
    });

    return member;
  }
}
