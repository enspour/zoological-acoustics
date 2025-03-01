import { Task } from '@kudu/domain';

export interface GetTasksByProjectResponseDto {
  statusCode: number;
  data: { tasks: Task[] };
}
