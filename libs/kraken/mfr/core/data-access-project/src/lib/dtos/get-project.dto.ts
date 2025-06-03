import { Project } from '@kraken/domain';

export interface GetProjectResponseDto {
  statusCode: number;
  data: { project: Project };
}
