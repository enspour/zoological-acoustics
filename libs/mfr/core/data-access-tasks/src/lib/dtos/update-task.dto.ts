import { Task } from '@kudu/domain';

export interface UpdateTaskResponseDto {
  statusCode: number;
  data: { task: Task };
}
