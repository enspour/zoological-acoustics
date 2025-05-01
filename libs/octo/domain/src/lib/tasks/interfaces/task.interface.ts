import { TaskBoard } from './task-board.interface';
import { TaskColumn } from './task-column.interface';

export interface Task {
  uuid: string;
  title: string;
  startDate: string;
  endDate: string;
  boardUuid: string;
  columnUuid: string | null;
  executorUuids: string[];
  createdByUuid: string;
  createdAt: string;
}

export type CreatableTask = Omit<Task, 'uuid' | 'createdByUuid' | 'createdAt'>;
export type UpdatableTask = Omit<Task, 'createdByUuid' | 'createdAt'>;

export type TaskWithColumn = Task & { column: TaskColumn | null };
export type TaskWithBoard = Task & { board: TaskBoard };
