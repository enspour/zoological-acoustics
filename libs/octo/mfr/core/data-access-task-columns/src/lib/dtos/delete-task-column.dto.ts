import { TaskColumn } from '@octo/domain';

export interface DeleteTaskColumnResponseDto {
  statusCode: number;
  data: { column: TaskColumn };
}
