import { CreatableProjectDataField, ProjectDataField } from '@kudu/domain';

export type CreateProjectDataFieldDto = CreatableProjectDataField;

export interface CreateProjectDataFieldResponseDto {
  statusCode: number;
  data: { field: ProjectDataField };
}
