import { TaskColumn } from '@kudu/domain';

export interface GetTaskColumnsByProjectDto {
  statusCode: number;
  data: { columns: TaskColumn[] };
}
