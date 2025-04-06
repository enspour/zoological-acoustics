import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { KuduDatepickerComponent } from '@kudu-ui';

import { TasksService } from '@kudu/mfr-data-access-tasks';

import { BrowseTaskComponent } from '../../browse-task.component';

@Component({
  selector: 'lib-info-deadline-section',
  imports: [KuduDatepickerComponent],
  templateUrl: './info-deadline-section.component.html',
  styleUrl: './info-deadline-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoDeadlineSectionComponent {
  private browser = inject(BrowseTaskComponent);
  private tasksService = inject(TasksService);

  public task = this.browser.task;

  public async onDeadlineChange(period: {
    startDate?: Date | number | string;
    endDate?: Date | number | string;
  }) {
    await this.tasksService.updateTask({
      ...this.task(),
      startDate: period.startDate
        ? new Date(period.startDate).toISOString()
        : this.task().startDate,
      endDate: period.endDate
        ? new Date(period.endDate).toISOString()
        : this.task().endDate,
    });
  }
}
