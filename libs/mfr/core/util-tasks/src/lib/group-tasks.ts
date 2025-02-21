import { groupBy } from '@kudu-utils';
import { Task } from '@kudu/domain';

type GroupableTaskFields = keyof Pick<Task, 'boardUuid' | 'executorUuids'>;

const groupTasksByExecutors = (tasks: Task[]) => {
  return tasks.reduce(
    (acc, task) => {
      for (const uuid of task.executorUuids) {
        if (!(uuid in acc)) {
          acc[uuid] = [];
        }

        acc[uuid]!.push(task);
      }

      return acc;
    },
    {} as Partial<Record<string, Task[]>>,
  );
};

export const groupTasks = (tasks: Task[], field: GroupableTaskFields) => {
  switch (field) {
    case 'executorUuids':
      return groupTasksByExecutors(tasks);
    case 'boardUuid':
      return groupBy(tasks, (task) => task.boardUuid);
  }
};
