import { TaskColumn } from '@kraken/domain';

export interface CreateTaskColumnResponseDto {
  statusCode: number;
  data: { column: TaskColumn };
}
