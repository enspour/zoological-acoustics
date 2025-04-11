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
