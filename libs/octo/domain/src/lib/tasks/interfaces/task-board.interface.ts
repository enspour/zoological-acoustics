export interface TaskBoard {
  uuid: string;
  title: string;
  projectUuid: string;
}

export type CreatableTaskBoard = Omit<TaskBoard, 'uuid'>;
export type UpdatableTaskBoard = TaskBoard;
