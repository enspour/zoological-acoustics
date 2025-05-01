import { ProjectDataField } from '@octo/domain';

export interface DeleteProjectDataFieldResponseDto {
  statusCode: number;
  data: { field: ProjectDataField };
}
