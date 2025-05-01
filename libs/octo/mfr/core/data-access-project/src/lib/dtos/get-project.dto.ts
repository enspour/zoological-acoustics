import { Project } from '@octo/domain';

export interface GetProjectResponseDto {
  statusCode: number;
  data: { project: Project };
}
