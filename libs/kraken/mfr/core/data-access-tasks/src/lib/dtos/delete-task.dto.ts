import { Task } from '@kraken/domain';

export interface DeleteTaskResponseDto {
  statusCode: number;
  data: { task: Task };
}
