import { TaskBoard } from '@kraken/domain';

export interface CreateTaskBoardResponseDto {
  statusCode: number;
  data: { board: TaskBoard };
}
