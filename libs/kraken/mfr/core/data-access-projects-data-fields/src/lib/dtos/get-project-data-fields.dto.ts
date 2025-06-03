import { ProjectDataField } from '@kraken/domain';

export interface GetProjectDataFieldsResponseDto {
  statusCode: number;
  data: { fields: ProjectDataField[] };
}
