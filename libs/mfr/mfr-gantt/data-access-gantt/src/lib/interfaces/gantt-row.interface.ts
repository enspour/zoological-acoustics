import { Employee, Task } from '@kudu/domain';

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

export type GanttRow = GanttRowTask | GanttRowExecutor;
