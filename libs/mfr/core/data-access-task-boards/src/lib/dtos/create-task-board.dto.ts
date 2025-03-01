import { TaskBoard } from '@kudu/domain';

export interface CreateTaskBoardResponseDto {
  statusCode: number;
  data: { board: TaskBoard };
}
