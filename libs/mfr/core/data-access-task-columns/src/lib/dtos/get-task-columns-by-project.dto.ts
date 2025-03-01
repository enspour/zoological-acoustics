import { TaskColumn } from '@kudu/domain';

export interface GetTaskColumnsByProjectResponseDto {
  statusCode: number;
  data: { columns: TaskColumn[] };
}
