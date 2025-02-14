import { Injectable, signal } from '@angular/core';

import { Task } from '@kudu/domain';

import { KanbanColumn } from './interfaces';

@Injectable()
export class KanbanBoardService {
  public columns = signal([
    {
      uuid: '1',
      title: 'Задачи',
      tasks: new Array(100).fill(0).map(
        (_, i) =>
          ({
            uuid: `${i}`,
            title: `Задача ${i}`,
            startDate: `2001-01-01 12:00:00`,
            endDate: `2002-01-15 12:00:00`,
            projectUuid: '',
            executorUuids: [],
          }) satisfies Task,
      ),
    },
    {
      uuid: '2',
      title: 'В разработке',
      tasks: new Array(4).fill(0).map(
        (_, i) =>
          ({
            uuid: `100${i}`,
            title: `Задача 100${i}`,
            startDate: `2001-01-01 12:00:00`,
            endDate: `2002-01-15 12:00:00`,
            projectUuid: '',
            executorUuids: [],
          }) satisfies Task,
      ),
    },
  ]);

  public moveColumn(prevIndex: number, nextIndex: number) {
    this.columns.update((columns) => {
      const column = columns[prevIndex];
      return columns.toSpliced(prevIndex, 1).toSpliced(nextIndex, 0, column);
    });
  }

  public moveTask(
    prevColumn: KanbanColumn,
    prevIndex: number,
    nextColumn: KanbanColumn,
    nextIndex: number,
  ) {
    this.columns.update((columns) => {
      const prev = columns.find((c) => c.uuid === prevColumn.uuid);
      const next = columns.find((c) => c.uuid === nextColumn.uuid);

      if (!prev || !next) {
        return columns;
      }

      const task = prev.tasks[prevIndex];

      prev.tasks = prev.tasks.toSpliced(prevIndex, 1);
      next.tasks = next.tasks.toSpliced(nextIndex, 0, task);

      return [...columns];
    });
  }
}
