import { TaskBoard } from '@kraken/domain';

export interface GetTaskBoardsByProjectResponseDto {
  statusCode: number;
  data: { boards: TaskBoard[] };
}
