import { ProjectDataField } from '@kudu/domain';

export interface DeleteProjectDataFieldResponseDto {
  statusCode: number;
  data: { field: ProjectDataField };
}
