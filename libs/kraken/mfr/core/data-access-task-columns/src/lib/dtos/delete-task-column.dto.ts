import { TaskColumn } from '@kraken/domain';

export interface DeleteTaskColumnResponseDto {
  statusCode: number;
  data: { column: TaskColumn };
}
