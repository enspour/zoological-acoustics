import { Project } from '@kraken/domain';

export interface GetProjectsResponseDto {
  statusCode: number;
  data: { projects: Project[] };
}
