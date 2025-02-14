import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

import {
  KuduTabComponent,
  KuduTabContentDirective,
  KuduTabsComponent,
} from '@kudu-ui';

import { Task } from '@kudu/domain';

import { InfoTabComponent } from './components/info-tab/info-tab.component';
import { LogsTabComponent } from './components/logs-tab/logs-tab.component';

@Component({
  selector: 'lib-browse-task',
  imports: [
    KuduTabsComponent,
    KuduTabComponent,
    KuduTabContentDirective,
    InfoTabComponent,
    LogsTabComponent,
  ],
  templateUrl: './browse-task.component.html',
  styleUrl: './browse-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseTaskComponent {
  public task = input.required<Task>();

  public currentIndex = signal(0);
}
