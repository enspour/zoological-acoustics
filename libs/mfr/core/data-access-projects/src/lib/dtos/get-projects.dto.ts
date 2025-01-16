import { Project } from '@kudu/domain';

export interface GetProjectsResponseDto {
  statusCode: number;
  data: { projects: Project[] };
}
