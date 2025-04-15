import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { Task } from '@kudu/domain';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import { ProjectTasksService } from '@kudu/mfr-data-access-project';
import { UserService } from '@kudu/mfr-data-access-user';

import { ActivatedRoute, Router } from '@angular/router';
import { KuduSortConfig } from '@kudu-ui';
import { TaskTableComponent } from '@kudu/mfr-ui-task';

@Component({
  selector: 'lib-project-my-tasks-page',
  imports: [TaskTableComponent],
  templateUrl: './project-my-tasks-page.component.html',
  styleUrl: './project-my-tasks-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMyTasksPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private explorerService = inject(ExplorerService);
  private projectTasksService = inject(ProjectTasksService);

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

  private getTasks() {
    const user = this.userService.user();
    if (!user) {
      return [];
    }

    return this.projectTasksService
      .tasks()
      .filter((task) => task.executorUuids.includes(user.uuid));
  }
}
