import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';

import {
  MkIconComponent,
  MkTabComponent,
  MkTabContentDirective,
  MkTabsComponent,
} from '@meerkat-ui';

import { Task } from '@kraken/domain';

import { TasksService } from '@kraken/mfr-data-access-tasks';

import { TaskMoreComponent } from '@kraken/mfr-ui-task';

import { InfoTabComponent } from './components/info-tab/info-tab.component';
import { LogsTabComponent } from './components/logs-tab/logs-tab.component';

@Component({
  selector: 'lib-browse-task',
  imports: [
    MkIconComponent,
    MkTabsComponent,
    MkTabComponent,
    MkTabContentDirective,
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
