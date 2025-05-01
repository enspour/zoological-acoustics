import { TaskColumn } from '@octo/domain';

export interface CreateTaskColumnResponseDto {
  statusCode: number;
  data: { column: TaskColumn };
}
