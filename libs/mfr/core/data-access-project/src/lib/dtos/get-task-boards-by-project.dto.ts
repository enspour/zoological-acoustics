import { TaskBoard } from '@kudu/domain';

export interface GetTaskBoardsByProjectDto {
  statusCode: number;
  data: { boards: TaskBoard[] };
}
