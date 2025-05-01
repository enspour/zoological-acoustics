import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  MkVirtualizationDirective,
  MkVirtualizeByRangeDirective,
} from '@meerkat-ui';

import {
  GanttRowsService,
  provideGanttDataAccess,
} from '@octo/mfr-data-access-gantt';

import { GanttChartComponent } from '@octo/mfr-feature-gantt-chart';
import {
  GanttLayoutColumnsDirective,
  GanttLayoutRowsDirective,
} from '@octo/mfr-feature-gantt-layout';
import { GanttSidebarComponent } from '@octo/mfr-feature-gantt-sidebar';
import { GanttToolbarComponent } from '@octo/mfr-feature-gantt-toolbar';

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
