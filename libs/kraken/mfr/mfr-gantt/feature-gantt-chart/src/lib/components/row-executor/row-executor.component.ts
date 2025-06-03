import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { Task } from '@kraken/domain';

import {
  GanttRowExecutor,
  GanttTimelineService,
} from '@kraken/mfr-data-access-gantt';

import { BrowseTaskComponent } from '@kraken/mfr-feature-browse-task';
import { ExplorerService } from '@kraken/mfr-feature-explorer';

import { GanttTaskComponent } from '@kraken/mfr-ui-gantt-task';

import {
  GanttLayoutColumnsDirective,
  GanttLayoutRowsDirective,
} from '@kraken/mfr-feature-gantt-layout';

import { CalculateTaskPropsPipe } from '../../pipes/calculate-task-props.pipe';

@Component({
  selector: 'lib-row-executor',
  imports: [GanttTaskComponent, CalculateTaskPropsPipe],
  templateUrl: './row-executor.component.html',
  styleUrl: './row-executor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-last]': 'row().isLast',
    '[style.height.px]': 'rowHeight()',
    '[style.top.px]': 'row().index * rowHeight()',
  },
})
export class RowExecutorComponent {
  private explorerService = inject(ExplorerService);
  private ganttLayoutRowsDirective = inject(GanttLayoutRowsDirective);
  private ganttLayoutColumnsDirective = inject(GanttLayoutColumnsDirective);
  private ganttTimelineService = inject(GanttTimelineService);

  public period = this.ganttTimelineService.period;

  public row = input.required<GanttRowExecutor>();
  public rowHeight = this.ganttLayoutRowsDirective.rowHeight;

  public columnWidth = this.ganttLayoutColumnsDirective.columnWidth;

  public onTaskClick(task: Task) {
    this.explorerService.open({
      component: BrowseTaskComponent,
      inputs: {
        task,
      },
    });
  }
}
