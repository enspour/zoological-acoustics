import { ProjectDataField } from '@kraken/domain';

export interface UpdateProjectDataFieldResponseDto {
  statusCode: number;
  data: { field: ProjectDataField };
}
