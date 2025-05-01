import { TaskColumn } from '@octo/domain';

export interface GetTaskColumnsByProjectResponseDto {
  statusCode: number;
  data: { columns: TaskColumn[] };
}
