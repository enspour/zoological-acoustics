import { TaskBoard } from '@octo/domain';

export interface CreateTaskBoardResponseDto {
  statusCode: number;
  data: { board: TaskBoard };
}
