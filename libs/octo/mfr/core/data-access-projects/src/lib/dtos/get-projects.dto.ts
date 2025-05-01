import { Project } from '@octo/domain';

export interface GetProjectsResponseDto {
  statusCode: number;
  data: { projects: Project[] };
}
