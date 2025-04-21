import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
} from '@angular/core';

import { KuduDate } from '@kudu-date';

import {
  KuduIconComponent,
  KuduInputContainerComponent,
  KuduInputDateComponent,
} from '@kudu-ui';

import { TasksService } from '@kudu/mfr-data-access-tasks';

import { BrowseTaskComponent } from '../../browse-task.component';

@Component({
  selector: 'lib-info-deadline-section',
  imports: [
    KuduIconComponent,
    KuduInputContainerComponent,
    KuduInputDateComponent,
  ],
  templateUrl: './info-deadline-section.component.html',
  styleUrl: './info-deadline-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoDeadlineSectionComponent {
  private browser = inject(BrowseTaskComponent);
  private tasksService = inject(TasksService);

  public task = this.browser.task;

  public startDate = linkedSignal(
    () => new KuduDate(this.browser.task().startDate),
  );

  public endDate = linkedSignal(
    () => new KuduDate(this.browser.task().endDate),
  );

  public async onDeadlineChange() {
    await this.tasksService.updateTask({
      ...this.task(),
      startDate: this.startDate().toDate().toISOString(),
      endDate: this.endDate().toDate().toISOString(),
    });
  }
}
