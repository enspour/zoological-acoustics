import { Task } from '@octo/domain';

export interface CreateTaskResponseDto {
  statusCode: number;
  data: { task: Task };
}
