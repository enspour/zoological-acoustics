import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  KuduVirtualizationDirective,
  KuduVirtualizeByRangeDirective,
} from '@kudu-ui';

import {
  GanttChartLayoutDirective,
  GanttChartService,
  GanttLayoutDirective,
} from '@kudu/mfr-data-access-gantt';

import { GanttChartComponent } from '@kudu/mfr-feature-gantt-chart';
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
    GanttLayoutDirective,
    GanttChartLayoutDirective,
  ],
  templateUrl: './gantt-page.component.html',
  styleUrl: './gantt-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GanttPageComponent {
  private ganttChartService = inject(GanttChartService);

  public rows = this.ganttChartService.rows;
}
