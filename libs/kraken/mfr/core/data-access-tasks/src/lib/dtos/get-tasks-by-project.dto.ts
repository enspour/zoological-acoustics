import { Task } from '@kraken/domain';

export interface GetTasksByProjectResponseDto {
  statusCode: number;
  data: { tasks: Task[] };
}
