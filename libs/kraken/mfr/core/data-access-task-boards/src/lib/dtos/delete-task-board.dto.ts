import { TaskBoard } from '@kraken/domain';

export interface DeleteTaskBoardResponseDto {
  statusCode: number;
  data: { board: TaskBoard };
}
