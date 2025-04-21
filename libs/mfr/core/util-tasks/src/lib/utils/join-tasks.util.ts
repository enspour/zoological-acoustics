import { mapBy } from '@kudu-utils';

import { Task, TaskColumn } from '@kudu/domain';

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
