import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
} from '@angular/core';

import { GanttRowExecutor } from '@kudu/mfr-data-access-gantt';

import { BrowseEmployeeComponent } from '@kudu/mfr-feature-browse-employee';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

import { GanttLayoutRowsDirective } from 'libs/mfr/mfr-gantt/feature-gantt-layout/src';

@Component({
  selector: 'lib-row-executor',
  imports: [],
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

  public row = input.required<GanttRowExecutor>();
  public rowCount = this.ganttLayoutRowsDirective.rowCount;
  public rowHeight = this.ganttLayoutRowsDirective.rowHeight;

  @HostListener('click')
  public onRowClick() {
    this.explorerService.open({
      component: BrowseEmployeeComponent,
      inputs: {
        employee: this.row().executor,
      },
    });
  }
}
