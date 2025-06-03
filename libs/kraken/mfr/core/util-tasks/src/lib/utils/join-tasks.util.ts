import { mapBy } from '@meerkat-utils';

import { Task, TaskColumn } from '@kraken/domain';

export const joinTasksWithColumns = <T extends Task, C extends TaskColumn>(
  tasks: T[],
  columns: C[],
) => {
  const mappedColumns = mapBy(columns, (column) => column.uuid);
  return tasks.map((task) => ({
    ...task,
    column: task.columnUuid ? mappedColumns[task.columnUuid] || null : null,
  }));
};
