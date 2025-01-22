import { Task } from '@kudu/domain';

export interface GanttRowTask {
  type: 'task';
  task: Task;
  index: number;
}

export type GanttRow = GanttRowTask;
