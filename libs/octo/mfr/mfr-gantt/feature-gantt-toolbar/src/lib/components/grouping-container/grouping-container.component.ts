import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  GanttGrouping,
  GanttToolbarService,
} from '@octo/mfr-data-access-gantt';

import { GroupingComponent } from '../grouping/grouping.component';

@Component({
  selector: 'lib-grouping-container',
  imports: [GroupingComponent],
  templateUrl: './grouping-container.component.html',
  styleUrl: './grouping-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupingContainerComponent {
  private ganttToolbarService = inject(GanttToolbarService);

  public grouping = this.ganttToolbarService.grouping;

  public onGroupingChange(value: GanttGrouping) {
    this.ganttToolbarService.setGrouping(value);
  }
}
