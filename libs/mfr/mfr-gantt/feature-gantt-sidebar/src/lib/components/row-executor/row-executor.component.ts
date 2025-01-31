import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  input,
} from '@angular/core';

import {
  GanttLayoutDirective,
  GanttRowExecutor,
} from '@kudu/mfr-data-access-gantt';

import { BrowseEmployeeComponent } from '@kudu/mfr-feature-browse-employee';
import { ExplorerService } from '@kudu/mfr-feature-explorer';

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
  private ganttLayoutDirective = inject(GanttLayoutDirective);

  public row = input.required<GanttRowExecutor>();
  public rowCount = this.ganttLayoutDirective.rowCount;
  public rowHeight = this.ganttLayoutDirective.rowHeight;

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
