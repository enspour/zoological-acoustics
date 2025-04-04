import { ProjectDataField } from '@kudu/domain';

export interface GetProjectDataFieldsResponseDto {
  statusCode: number;
  data: { fields: ProjectDataField[] };
}
