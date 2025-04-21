import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { KuduIconComponent, KuduSortConfig } from '@kudu-ui';

import { KuduFilterPipe } from '@kudu-ng-utils';

import { Task, TaskBoard } from '@kudu/domain';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import {
  ProjectTaskBoardsService,
  ProjectTaskColumnsService,
  ProjectTasksService,
} from '@kudu/mfr-data-access-project';

import { UserService } from '@kudu/mfr-data-access-user';

import { EmployeesService } from '@kudu/mfr-data-access-employees';

import { TaskTableComponent } from '@kudu/mfr-ui-task';
import { TaskBoardMoreComponent } from '@kudu/mfr-ui-task-board';

import { joinTasksWithColumns } from '@kudu/mfr-util-tasks';

@Component({
  selector: 'lib-project-my-tasks-page',
  imports: [
    KuduIconComponent,
    KuduFilterPipe,
    TaskTableComponent,
    TaskBoardMoreComponent,
  ],
  templateUrl: './project-my-tasks-page.component.html',
  styleUrl: './project-my-tasks-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMyTasksPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private employeesService = inject(EmployeesService);
  private explorerService = inject(ExplorerService);
  private projectTasksService = inject(ProjectTasksService);
  private projectTaskBoardsService = inject(ProjectTaskBoardsService);
  private projectTaskColumnsService = inject(ProjectTaskColumnsService);

  public employees = this.employeesService.employees;
  public boards = this.projectTaskBoardsService.boards;
  public tasks = computed(() => this.getTasks());

  public sortBy = input<KuduSortConfig['by']>();
  public sortOrder = input<KuduSortConfig['order']>();

  public sortConfig = linkedSignal(() => {
    const sortBy = this.sortBy();
    const sortOrder = this.sortOrder();
    return sortBy && sortOrder ? { by: sortBy, order: sortOrder } : undefined;
  });

  public onSortConfigChange(config?: KuduSortConfig) {
    const queryParams = {
      ...this.route.snapshot.queryParams,
      sortBy: config?.by,
      sortOrder: config?.order,
    };

    this.router.navigate([], { queryParams, relativeTo: this.route });
  }

  public onTaskClick(task: Task) {
    this.explorerService.open({
      component: BrowseTaskComponent,
      inputs: {
        task,
      },
    });
  }

  public filterByBoard(board: TaskBoard) {
    return (task: Task) => task.boardUuid === board.uuid;
  }

  private getTasks() {
    const user = this.userService.user();

    if (!user) {
      return [];
    }

    const columns = this.projectTaskColumnsService.columns();
    const tasks = this.projectTasksService
      .tasks()
      .filter((task) => task.executorUuids.includes(user.uuid));

    return joinTasksWithColumns(tasks, columns);
  }
}
