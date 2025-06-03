import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
} from '@angular/core';

import { GanttRowExecutor } from '@kraken/mfr-data-access-gantt';

import { BrowseEmployeeComponent } from '@kraken/mfr-feature-browse-employee';
import { ExplorerService } from '@kraken/mfr-feature-explorer';

import { GanttLayoutRowsDirective } from '@kraken/mfr-feature-gantt-layout';

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
