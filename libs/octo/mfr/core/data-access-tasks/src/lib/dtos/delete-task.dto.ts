import { Task } from '@octo/domain';

export interface DeleteTaskResponseDto {
  statusCode: number;
  data: { task: Task };
}
