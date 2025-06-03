import { CreatableProjectDataField, ProjectDataField } from '@kraken/domain';

export type CreateProjectDataFieldDto = CreatableProjectDataField;

export interface CreateProjectDataFieldResponseDto {
  statusCode: number;
  data: { field: ProjectDataField };
}
