import { Injectable } from '@nestjs/common';

import { MkBadRequestError } from '@meerkat-nest-errors';
import { MkPostgresService } from '@meerkat-nest-pg';

import {
  CreatableProjectDataValue,
  ProjectDataFieldType,
} from '@kraken/domain';

import {
  ProjectDataFieldEntity,
  ProjectDataValueEntity,
} from '@kraken/msrv-data-access-project-entities';

@Injectable()
export class ProjectDataValuesService {
  constructor(private postgresService: MkPostgresService) {}

  public async getByField(fieldUuid: string) {
    return await this.postgresService.Manager.find(ProjectDataValueEntity, {
      where: { fieldUuid },
    });
  }

  public async create(data: CreatableProjectDataValue) {
    const field = await this.postgresService.Manager.findOne(
      ProjectDataFieldEntity,
      {
        where: { uuid: data.fieldUuid },
      },
    );

    if (!field) {
      throw new MkBadRequestError('Дополнительное поле не существует!');
    }

    if (
      field.type === ProjectDataFieldType.number ||
      field.type === ProjectDataFieldType.string
    ) {
      throw new MkBadRequestError(
        'Нельзя создать значение у поля с типом (number, string)',
      );
    }

    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(ProjectDataValueEntity, { ...data, field });
  }
}
