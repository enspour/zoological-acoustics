import { Task } from '@kudu/domain';

export interface CreateTaskResponseDto {
  statusCode: number;
  data: { task: Task };
}
