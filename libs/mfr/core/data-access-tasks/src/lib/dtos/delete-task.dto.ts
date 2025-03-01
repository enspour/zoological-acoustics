import { Task } from '@kudu/domain';

export interface DeleteTaskResponseDto {
  statusCode: number;
  data: { task: Task };
}
