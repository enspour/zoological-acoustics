import { ProjectDataField } from '@octo/domain';

export interface GetProjectDataFieldsResponseDto {
  statusCode: number;
  data: { fields: ProjectDataField[] };
}
