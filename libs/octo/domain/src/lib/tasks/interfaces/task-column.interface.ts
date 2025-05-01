export interface TaskColumn {
  uuid: string;
  title: string;
  color: string;
  boardUuid: string;
}

export type CreatableTaskColumn = Omit<TaskColumn, 'uuid'>;
export type UpdatableTaskColumn = TaskColumn;
