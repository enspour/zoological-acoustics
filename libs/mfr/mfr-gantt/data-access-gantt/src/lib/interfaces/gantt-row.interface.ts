import { Employee, Task, TaskBoard } from '@kudu/domain';

export interface GanttRowBoard {
  type: 'board';
  board: TaskBoard;
  index: number;
}

export interface GanttRowTask {
  type: 'task';
  task: Task;
  index: number;
}

export interface GanttRowExecutor {
  type: 'executor';
  executor: Employee;
  tasks: Task[];
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

export type GanttRow = GanttRowBoard | GanttRowTask | GanttRowExecutor;
