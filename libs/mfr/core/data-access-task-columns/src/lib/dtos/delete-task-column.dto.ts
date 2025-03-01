import { TaskColumn } from '@kudu/domain';

export interface DeleteTaskColumnResponseDto {
  statusCode: number;
  data: { column: TaskColumn };
}
