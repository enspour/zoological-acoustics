import { TaskBoard } from '@kudu/domain';

export interface DeleteTaskBoardResponseDto {
  statusCode: number;
  data: { board: TaskBoard };
}
