import { Injectable } from '@nestjs/common';

import {
  BadRequestError,
  CreatableProjectDataValue,
  ProjectDataFieldType,
} from '@kudu/domain';

import { PostgresService } from '@kudu/msrv-data-access-postgres';
import {
  ProjectDataFieldEntity,
  ProjectDataValueEntity,
} from '@kudu/msrv-data-access-project-entities';

@Injectable()
export class ProjectDataValuesService {
  constructor(private postgresService: PostgresService) {}

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
      throw new BadRequestError('Дополнительное поле не существует!');
    }

    if (
      field.type === ProjectDataFieldType.number ||
      field.type === ProjectDataFieldType.string
    ) {
      throw new BadRequestError(
        'Нельзя создать значение у поля с типом (number, string)',
      );
    }

    const manager = this.postgresService.ManagerInTransaction;
    return await manager.save(ProjectDataValueEntity, { ...data, field });
  }
}
