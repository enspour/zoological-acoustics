import { TaskBoard } from '@octo/domain';

export interface GetTaskBoardsByProjectResponseDto {
  statusCode: number;
  data: { boards: TaskBoard[] };
}
