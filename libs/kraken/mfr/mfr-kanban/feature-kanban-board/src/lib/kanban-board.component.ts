import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { MkDndDragDirective, MkDndDropContainerDirective } from '@meerkat-dnd';

import { MkFilterPipe } from '@meerkat-ng-utils';

import { Employee, Task, TaskBoard, TaskColumn } from '@kraken/domain';

import {
  ProjectTaskColumnsService,
  ProjectTasksService,
} from '@kraken/mfr-data-access-project';

import { EmployeesService } from '@kraken/mfr-data-access-employees';
import { TaskColumnsService } from '@kraken/mfr-data-access-task-columns';
import { TasksService } from '@kraken/mfr-data-access-tasks';

import { BrowseTaskComponent } from '@kraken/mfr-feature-browse-task';
import { ExplorerService } from '@kraken/mfr-feature-explorer';

import { EmployeePickerComponent } from '@kraken/mfr-ui-employee';

import {
  KanbanColumnComponent,
  KanbanColumnCreationComponent,
  KanbanColumnUnassignedComponent,
} from '@kraken/mfr-ui-kanban-column';

import {
  KanbanTaskComponent,
  KanbanTaskCreationComponent,
} from '@kraken/mfr-ui-kanban-task';

import { GetEmployeesByUuidPipe } from '@kraken/mfr-util-employees';

@Component({
  selector: 'lib-kanban-board',
  imports: [
    MkDndDragDirective,
    MkDndDropContainerDirective,
    MkFilterPipe,
    KanbanColumnComponent,
    KanbanColumnCreationComponent,
    KanbanColumnUnassignedComponent,
    KanbanTaskComponent,
    KanbanTaskCreationComponent,
    EmployeePickerComponent,
    GetEmployeesByUuidPipe,
  ],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
  private explorerService = inject(ExplorerService);
  private projectTasksService = inject(ProjectTasksService);
  private projectTaskColumnsService = inject(ProjectTaskColumnsService);
  private tasksService = inject(TasksService);
  private taskColumnsService = inject(TaskColumnsService);
  private employeesService = inject(EmployeesService);

  public board = input.required<TaskBoard>();

  public tasks = this.projectTasksService.tasks;
  public columns = this.projectTaskColumnsService.columns;

  public employees = this.employeesService.employees;

  public async onColumnCreate(title: string) {
    const board = this.board();

    if (!board) {
      return;
    }

    await this.taskColumnsService.createColumn({
      title,
      color: '#7b869e',
      boardUuid: board.uuid,
    });
  }

  public async onColumnDelete(column: TaskColumn) {
    await this.taskColumnsService.deleteColumn(column);
  }

  public async onColumnDrop() {
    console.log('swap columns');
  }

  public onTaskClick(task: Task) {
    this.explorerService.open({
      component: BrowseTaskComponent,
      inputs: {
        task,
      },
    });
  }

  public async onTaskCreate(title: string, column: TaskColumn) {
    await this.tasksService.createTask({
      title,
      startDate: '2025-02-22',
      endDate: '2025-02-23',
      executorUuids: [],
      boardUuid: column.boardUuid,
      columnUuid: column.uuid,
    });
  }

  public async onTaskDelete(task: Task) {
    await this.tasksService.deleteTask(task);
  }

  public async onTaskExecutorsChange(task: Task, employees: Employee[]) {
    await this.tasksService.updateTask({
      ...task,
      executorUuids: employees.map((e) => e.uuid),
    });
  }

  public async onTaskDrop() {
    console.log('swap tasks');
  }

  public filterByBoardFn(board: TaskBoard) {
    return (item: Task | TaskColumn) => item.boardUuid === board.uuid;
  }

  public filterByColumnFn(column: TaskColumn | null) {
    return (task: Task) => task.columnUuid === (column?.uuid || null);
  }
}
