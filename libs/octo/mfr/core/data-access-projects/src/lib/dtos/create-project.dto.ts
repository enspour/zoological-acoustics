import { CreatableProject, Project } from '@octo/domain';

export type CreateProjectDto = CreatableProject;

export interface CreateProjectResponseDto {
  statusCode: number;
  data: { project: Project };
}
