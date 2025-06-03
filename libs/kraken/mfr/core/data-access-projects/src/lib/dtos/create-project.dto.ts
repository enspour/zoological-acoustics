import { CreatableProject, Project } from '@kraken/domain';

export type CreateProjectDto = CreatableProject;

export interface CreateProjectResponseDto {
  statusCode: number;
  data: { project: Project };
}
