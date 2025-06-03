import { groupBy } from '@meerkat-utils';

import { Task } from '@kraken/domain';

type GroupField = 'executor' | 'board';

const groupTasksByExecutors = <T extends Task>(tasks: T[]) => {
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
    {} as Partial<Record<string, T[]>>,
  );
};

export const groupTasks = <T extends Task>(tasks: T[], field: GroupField) => {
  switch (field) {
    case 'executor':
      return groupTasksByExecutors(tasks);
    case 'board':
      return groupBy(tasks, (task) => task.boardUuid);
  }
};
