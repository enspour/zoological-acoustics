import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  KuduVirtualizationDirective,
  KuduVirtualizeByRangeDirective,
} from '@kudu-ui';

import {
  GanttRowsService,
  provideGanttDataAccess,
} from '@kudu/mfr-data-access-gantt';

import { GanttChartComponent } from '@kudu/mfr-feature-gantt-chart';
import {
  GanttLayoutColumnsDirective,
  GanttLayoutRowsDirective,
} from '@kudu/mfr-feature-gantt-layout';
import { GanttSidebarComponent } from '@kudu/mfr-feature-gantt-sidebar';
import { GanttToolbarComponent } from '@kudu/mfr-feature-gantt-toolbar';

@Component({
  selector: 'lib-gantt-page',
  imports: [
    KuduVirtualizationDirective,
    KuduVirtualizeByRangeDirective,
    GanttChartComponent,
    GanttToolbarComponent,
    GanttSidebarComponent,
    GanttLayoutColumnsDirective,
    GanttLayoutRowsDirective,
  ],
  templateUrl: './gantt-page.component.html',
  styleUrl: './gantt-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideGanttDataAccess()],
})
export class GanttPageComponent {
  private ganttRowsService = inject(GanttRowsService);

  public rows = this.ganttRowsService.rows;
}
