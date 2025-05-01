import { Task } from '@octo/domain';

export interface UpdateTaskResponseDto {
  statusCode: number;
  data: { task: Task };
}
