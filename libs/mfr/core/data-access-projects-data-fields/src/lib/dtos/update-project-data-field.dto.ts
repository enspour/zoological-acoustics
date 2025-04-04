import { ProjectDataField } from '@kudu/domain';

export interface UpdateProjectDataFieldResponseDto {
  statusCode: number;
  data: { field: ProjectDataField };
}
