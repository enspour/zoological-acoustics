import { Project } from '@octo/domain';

export interface DeleteProjectResponseDto {
  statusCode: 200;
  data: {
    project: Project;
  };
}
