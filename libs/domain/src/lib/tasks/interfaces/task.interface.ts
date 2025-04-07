export interface Task {
  uuid: string;
  title: string;
  startDate: string;
  endDate: string;
  boardUuid: string;
  columnUuid: string | null;
  executorUuids: string[];
  creatorUuid: string;
  createdAt: string;
}

export type CreatableTask = Omit<Task, 'uuid' | 'creatorUuid' | 'createdAt'>;
export type UpdatableTask = Omit<Task, 'creatorUuid' | 'createdAt'>;
