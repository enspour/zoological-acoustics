import { TaskColumn } from '@kudu/domain';

export interface CreateTaskColumnResponseDto {
  statusCode: number;
  data: { column: TaskColumn };
}
