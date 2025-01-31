import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import {
  KuduVirtualizationDirective,
  KuduVirtualizeByRangeDirective,
} from '@kudu-ui';

import { EmployeesService } from '@kudu/mfr-data-access-employees';
import {
  GanttChartLayoutDirective,
  GanttChartService,
  GanttLayoutDirective,
  provideGanttDataAccess,
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
  providers: [provideGanttDataAccess()],
})
export class GanttPageComponent implements OnInit {
  private employeesService = inject(EmployeesService);
  private ganttChartService = inject(GanttChartService);

  public rows = this.ganttChartService.rows;

  ngOnInit(): void {
    this.employeesService.reload();
  }
}
