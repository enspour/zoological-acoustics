import { TaskColumn } from '@kraken/domain';

export interface GetTaskColumnsByProjectResponseDto {
  statusCode: number;
  data: { columns: TaskColumn[] };
}
