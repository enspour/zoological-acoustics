import { Project } from '@kraken/domain';

export interface DeleteProjectResponseDto {
  statusCode: 200;
  data: {
    project: Project;
  };
}
