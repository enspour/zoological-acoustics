import { Task } from '@octo/domain';

export interface GetTasksByProjectResponseDto {
  statusCode: number;
  data: { tasks: Task[] };
}
