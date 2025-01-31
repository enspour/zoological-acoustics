import { Task } from '@kudu/domain';

import { sortTasks } from '@kudu/mfr-util-tasks';

export const groupTasksByRows = (tasks: Task[]): Task[][] => {
  tasks = sortTasks(tasks, 'startDate', 'ASC');

  const groups: Task[][] = [];

  for (const task of tasks) {
    let isAddedToGroup = false;

    for (const group of groups) {
      const lastTask = group[group.length - 1];

      if (task.startDate > lastTask.endDate) {
        group.push(task);
        isAddedToGroup = true;
        break;
      }
    }

    if (!isAddedToGroup) {
      groups.push([task]);
    }
  }

  return groups;
};
