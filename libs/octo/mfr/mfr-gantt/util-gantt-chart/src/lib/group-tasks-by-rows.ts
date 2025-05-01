import { Task } from '@octo/domain';

import { sortTasks } from '@octo/mfr-util-tasks';

export const groupTasksByRows = (tasks: Task[]): Task[][] => {
  const sortedTasks = sortTasks(tasks, 'startDate', 'asc');

  const groups: Task[][] = [];

  for (const task of sortedTasks) {
    const group = groups.find(
      (group) => task.startDate > group[group.length - 1].endDate,
    );

    if (group) {
      group.push(task);
    } else {
      groups.push([task]);
    }
  }

  return groups;
};
