import { ProjectDataField } from '@kraken/domain';

export interface DeleteProjectDataFieldResponseDto {
  statusCode: number;
  data: { field: ProjectDataField };
}
