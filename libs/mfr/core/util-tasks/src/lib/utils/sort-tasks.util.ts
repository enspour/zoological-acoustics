import { KuduDate } from '@kudu-date';

import { Task, TaskWithColumn } from '@kudu/domain';

type SortBy =
  | { field: 'title'; type: Task }
  | { field: 'startDate'; type: Task }
  | { field: 'endDate'; type: Task }
  | { field: 'column'; type: TaskWithColumn };

type SortField = SortBy['field'];
type SortFieldToType = { [S in SortBy as S['field']]: S['type'] };
type SortFieldToComparator = {
  [S in SortBy as S['field']]: (a: S['type'], b: S['type']) => number;
};

type SortType<F extends SortField> = SortFieldToType[F];

const comparatorByTitle = (a: Task, b: Task) => a.title.localeCompare(b.title);

const comparatorByStartDate = (a: Task, b: Task) =>
  new KuduDate(a.startDate).valueOf() - new KuduDate(b.startDate).valueOf();

const comparatorByEndDate = (a: Task, b: Task) =>
  new KuduDate(a.endDate).valueOf() - new KuduDate(b.endDate).valueOf();

const comparatorByColumn = (a: TaskWithColumn, b: TaskWithColumn) => {
  if (!a.column && !b.column) return 0;
  if (!a.column) return 1;
  if (!b.column) return -1;
  return a.column.title.localeCompare(b.column.title);
};

const comparators: SortFieldToComparator = {
  title: comparatorByTitle,
  startDate: comparatorByStartDate,
  endDate: comparatorByEndDate,
  column: comparatorByColumn,
};

export const sortTasks = <F extends SortField>(
  tasks: SortType<F>[],
  field: F,
  order: 'asc' | 'desc',
) => {
  const compareFn = comparators[field] as (
    a: SortType<F>,
    b: SortType<F>,
  ) => number;

  return [...tasks].sort(
    (a, b) => compareFn(a, b) * (order === 'asc' ? 1 : -1),
  );
};
