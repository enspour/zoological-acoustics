import { CreatableProjectDataField, ProjectDataField } from '@octo/domain';

export type CreateProjectDataFieldDto = CreatableProjectDataField;

export interface CreateProjectDataFieldResponseDto {
  statusCode: number;
  data: { field: ProjectDataField };
}
