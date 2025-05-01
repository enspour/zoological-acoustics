import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import { GanttRow, GanttSidebarService } from '@octo/mfr-data-access-gantt';

import { HeaderComponent } from './components/header/header.component';
import { ResizerComponent } from './components/resizer/resizer.component';
import { RowsComponent } from './components/rows/rows.component';

@Component({
  selector: 'lib-gantt-sidebar',
  imports: [ResizerComponent, RowsComponent, HeaderComponent],
  templateUrl: './gantt-sidebar.component.html',
  styleUrl: './gantt-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width.px]': 'width()',
  },
})
export class GanttSidebarComponent {
  private sidebarService = inject(GanttSidebarService);

  public width = this.sidebarService.width;

  public rows = input.required<GanttRow[]>();
}
