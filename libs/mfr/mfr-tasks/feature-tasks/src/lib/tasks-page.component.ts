import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { KuduFilterPipe } from '@kudu-ng-utils';

import {
  KuduAccordionComponent,
  KuduAccordionItemComponent,
  KuduAccordionItemContentDirective,
  KuduIconComponent,
  KuduSortConfig,
} from '@kudu-ui';

import { Task, TaskBoard } from '@kudu/domain';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import {
  ProjectTaskBoardsService,
  ProjectTaskColumnsService,
  ProjectTasksService,
} from '@kudu/mfr-data-access-project';

import { EmployeesService } from '@kudu/mfr-data-access-employees';

import { TaskTableComponent } from '@kudu/mfr-ui-task';
import { TaskBoardMoreComponent } from '@kudu/mfr-ui-task-board';

import { joinTasksWithColumns } from '@kudu/mfr-util-tasks';

@Component({
  selector: 'lib-tasks-page',
  imports: [
    FormsModule,
    KuduIconComponent,
    KuduAccordionComponent,
    KuduAccordionItemComponent,
    KuduAccordionItemContentDirective,
    KuduFilterPipe,
    TaskTableComponent,
    TaskBoardMoreComponent,
  ],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private explorerService = inject(ExplorerService);
  private employeesService = inject(EmployeesService);
  private projectTasksService = inject(ProjectTasksService);
  private projectTaskBoardsService = inject(ProjectTaskBoardsService);
  private projectTaskColumnsService = inject(ProjectTaskColumnsService);

  public employees = this.employeesService.employees;
  public boards = this.projectTaskBoardsService.boards;
  public tasks = computed(() => this.getTasks());

  public user = input<string>();

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
    const tasks = this.projectTasksService.tasks();
    const columns = this.projectTaskColumnsService.columns();

    const by = this.user();

    if (by) {
      return joinTasksWithColumns(
        tasks.filter((task) => task.executorUuids.includes(by)),
        columns,
      );
    }

    return joinTasksWithColumns(tasks, columns);
  }
}
