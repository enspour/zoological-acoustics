import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
} from '@angular/core';

import { MkDate } from '@meerkat-date';

import {
  MkIconComponent,
  MkInputContainerComponent,
  MkInputDateComponent,
} from '@meerkat-ui';

import { TasksService } from '@octo/mfr-data-access-tasks';

import { BrowseTaskComponent } from '../../browse-task.component';

@Component({
  selector: 'lib-info-deadline-section',
  imports: [MkIconComponent, MkInputContainerComponent, MkInputDateComponent],
  templateUrl: './info-deadline-section.component.html',
  styleUrl: './info-deadline-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoDeadlineSectionComponent {
  private browser = inject(BrowseTaskComponent);
  private tasksService = inject(TasksService);

  public task = this.browser.task;

  public startDate = linkedSignal(
    () => new MkDate(this.browser.task().startDate),
  );

  public endDate = linkedSignal(() => new MkDate(this.browser.task().endDate));

  public async onDeadlineChange() {
    await this.tasksService.updateTask({
      ...this.task(),
      startDate: this.startDate().toDate().toISOString(),
      endDate: this.endDate().toDate().toISOString(),
    });
  }
}
