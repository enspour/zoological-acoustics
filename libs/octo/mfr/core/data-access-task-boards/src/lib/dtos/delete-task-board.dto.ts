import { TaskBoard } from '@octo/domain';

export interface DeleteTaskBoardResponseDto {
  statusCode: number;
  data: { board: TaskBoard };
}
