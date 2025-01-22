export interface Task {
  uuid: string;
  title: string;
  startDate: string;
  endDate: string;
  projectUuid: string;
  executorUuids: string[];
}
