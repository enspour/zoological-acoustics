import { Task } from '@kraken/domain';

export interface CreateTaskResponseDto {
  statusCode: number;
  data: { task: Task };
}
