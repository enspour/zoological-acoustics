import { Project } from '@kudu/domain';

export interface GetProjectResponseDto {
  statusCode: number;
  data: { project: Project };
}
