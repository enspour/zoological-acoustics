import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';

import {
  KuduIconComponent,
  KuduSortConfig,
  KuduSortDirective,
  KuduSortPipe,
  KuduTableComponent,
  KuduTableDataCellComponent,
  KuduTableHeaderComponent,
  KuduTableHeaderSortDirective,
  KuduTooltipDirective,
} from '@kudu-ui';

import { Project } from '@kudu/domain';

@Component({
  selector: 'lib-project-table',
  imports: [
    KuduTableComponent,
    KuduTableDataCellComponent,
    KuduTableHeaderComponent,
    KuduTableHeaderSortDirective,
    KuduSortDirective,
    KuduSortPipe,
    KuduIconComponent,
    KuduTooltipDirective,
  ],
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTableComponent {
  public projects = input.required<Project[]>();

  public sortConfig = model<KuduSortConfig>();

  public byProjectClick = output<Project>();

  public onClick(project: Project) {
    this.byProjectClick.emit(project);
  }
}
