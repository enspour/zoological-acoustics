import { Task } from '@kraken/domain';

export interface UpdateTaskResponseDto {
  statusCode: number;
  data: { task: Task };
}
