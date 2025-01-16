import { CreatableProject, Project } from '@kudu/domain';

export type CreateProjectDto = CreatableProject;

export interface CreateProjectResponseDto {
  statusCode: number;
  data: { project: Project };
}
