import { Project } from '@kudu/domain';

export interface DeleteProjectResponseDto {
  statusCode: 200;
  data: {
    project: Project;
  };
}
