import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Task } from '@kudu/domain';

import { BrowseTaskComponent } from '@kudu/mfr-feature-browse-task';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import { ProjectTasksService } from '@kudu/mfr-data-access-project';
import { UserService } from '@kudu/mfr-data-access-user';

import { TaskTableComponent } from '@kudu/mfr-ui-task';

@Component({
  selector: 'lib-project-my-tasks-page',
  imports: [TaskTableComponent],
  templateUrl: './project-my-tasks-page.component.html',
  styleUrl: './project-my-tasks-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMyTasksPageComponent {
  private userService = inject(UserService);
  private explorerService = inject(ExplorerService);
  private projectTasksService = inject(ProjectTasksService);

  public tasks = computed(() => this.getTasks());

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

    const tasks = this.projectTasksService.tasks() || [];
    return tasks.filter((task) => task.executorUuids.includes(user.uuid));
  }
}
