import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  MkVirtualizationDirective,
  MkVirtualizeByRangeDirective,
} from '@meerkat-ui';

import {
  GanttRowsService,
  provideGanttDataAccess,
} from '@kraken/mfr-data-access-gantt';

import { GanttChartComponent } from '@kraken/mfr-feature-gantt-chart';
import {
  GanttLayoutColumnsDirective,
  GanttLayoutRowsDirective,
} from '@kraken/mfr-feature-gantt-layout';
import { GanttSidebarComponent } from '@kraken/mfr-feature-gantt-sidebar';
import { GanttToolbarComponent } from '@kraken/mfr-feature-gantt-toolbar';

@Component({
  selector: 'lib-gantt-page',
  imports: [
    MkVirtualizationDirective,
    MkVirtualizeByRangeDirective,
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
