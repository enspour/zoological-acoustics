import { ProjectMember, Task, TaskBoard } from '@kudu/domain';

export interface GanttRowBoard {
  type: 'board';
  board: TaskBoard;
  index: number;
  isOpen: boolean;
}

export interface GanttRowBoardCreation {
  type: 'board-creation';
  index: number;
}

export interface GanttRowTask {
  type: 'task';
  task: Task;
  index: number;
}

export interface GanttRowTaskCreation {
  type: 'task-creation';
  board: TaskBoard;
  index: number;
}

export interface GanttRowTasksUnassigned {
  type: 'tasks-unassigned';
  tasks: Task[];
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface GanttRowExecutor {
  type: 'executor';
  executor: ProjectMember;
  tasks: Task[];
  index: number;
  isFirst: boolean;
  isLast: boolean;
}

export type GanttRow =
  | GanttRowBoard
  | GanttRowBoardCreation
  | GanttRowTask
  | GanttRowTaskCreation
  | GanttRowTasksUnassigned
  | GanttRowExecutor;
