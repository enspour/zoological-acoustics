import { groupBy } from '@kudu-utils';

import { Task } from '@kudu/domain';

type GroupableTaskFields = 'executor' | 'board' | 'board:executor';

const groupTasksByExecutors = (tasks: Task[]) => {
  return tasks.reduce(
    (acc, task) => {
      if (task.executorUuids.length === 0) {
        const key = '';

        if (!(key in acc)) {
          acc[key] = [];
        }

        acc[key]!.push(task);
      }

      for (const executorUuid of task.executorUuids) {
        const key = `${executorUuid}`;

        if (!(key in acc)) {
          acc[key] = [];
        }

        acc[key]!.push(task);
      }

      return acc;
    },
    {} as Partial<Record<string, Task[]>>,
  );
};

const groupTasksByBoardsAndExecutors = (tasks: Task[]) => {
  return tasks.reduce(
    (acc, task) => {
      if (task.executorUuids.length === 0) {
        const key = `${task.boardUuid}`;

        if (!(key in acc)) {
          acc[key] = [];
        }

        acc[key]!.push(task);
      }

      for (const executorUuid of task.executorUuids) {
        const key = `${task.boardUuid}:${executorUuid}`;

        if (!(key in acc)) {
          acc[key] = [];
        }

        acc[key]!.push(task);
      }

      return acc;
    },
    {} as Partial<Record<string, Task[]>>,
  );
};

export const groupTasks = (tasks: Task[], field: GroupableTaskFields) => {
  switch (field) {
    case 'executor':
      return groupTasksByExecutors(tasks);
    case 'board':
      return groupBy(tasks, (task) => task.boardUuid);
    case 'board:executor':
      return groupTasksByBoardsAndExecutors(tasks);
  }
};
