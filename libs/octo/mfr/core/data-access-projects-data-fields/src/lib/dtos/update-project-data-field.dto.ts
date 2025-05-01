import { ProjectDataField } from '@octo/domain';

export interface UpdateProjectDataFieldResponseDto {
  statusCode: number;
  data: { field: ProjectDataField };
}
