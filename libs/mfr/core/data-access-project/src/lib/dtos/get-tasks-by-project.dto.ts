import { Task } from '@kudu/domain';

export interface GetTasksByProjectDto {
  statusCode: number;
  data: { tasks: Task[] };
}
