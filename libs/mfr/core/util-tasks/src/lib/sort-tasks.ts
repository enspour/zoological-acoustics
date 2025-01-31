import { DateTime } from '@kudu-date';

import { Task } from '@kudu/domain';

type SortableTaskFields = keyof Pick<Task, 'title' | 'startDate' | 'endDate'>;

const compare = (a: Task, b: Task, field: SortableTaskFields) => {
  switch (field) {
    case 'title':
      return a[field].localeCompare(b[field]);
    case 'startDate':
    case 'endDate':
      return (
        new DateTime(a[field]).valueOf() - new DateTime(b[field]).valueOf()
      );
  }
};

export const sortTasks = (
  tasks: Task[],
  field: SortableTaskFields,
  order: 'ASC' | 'DESC',
) => {
  return [...tasks].sort(
    (a, b) => compare(a, b, field) * (order === 'ASC' ? 1 : -1),
  );
};
