import { TaskBoard } from '@kudu/domain';

export interface GetTaskBoardsByProjectResponseDto {
  statusCode: number;
  data: { boards: TaskBoard[] };
}
