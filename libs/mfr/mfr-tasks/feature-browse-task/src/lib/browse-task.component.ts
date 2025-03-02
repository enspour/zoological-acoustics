import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';

import {
  KuduIconComponent,
  KuduTabComponent,
  KuduTabContentDirective,
  KuduTabsComponent,
} from '@kudu-ui';

import { Task } from '@kudu/domain';

import { TasksService } from '@kudu/mfr-data-access-tasks';

import { TaskMoreComponent } from '@kudu/mfr-ui-task';

import { InfoTabComponent } from './components/info-tab/info-tab.component';
import { LogsTabComponent } from './components/logs-tab/logs-tab.component';

@Component({
  selector: 'lib-browse-task',
  imports: [
    KuduIconComponent,
    KuduTabsComponent,
    KuduTabComponent,
    KuduTabContentDirective,
    InfoTabComponent,
    LogsTabComponent,
    TaskMoreComponent,
  ],
  templateUrl: './browse-task.component.html',
  styleUrl: './browse-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseTaskComponent {
  private tasksService = inject(TasksService);

  public task = input.required<Task>();

  public currentIndex = signal(0);

  public async onDelete() {
    await this.tasksService.deleteTask(this.task());
  }
}
