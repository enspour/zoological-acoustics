import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import {
  KuduIconComponent,
  KuduSortDirective,
  KuduSortPipe,
  KuduTableComponent,
  KuduTableDataCellComponent,
  KuduTableHeaderComponent,
  KuduTableHeaderSortDirective,
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
  ],
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTableComponent {
  public projects = input.required<Project[]>();

  public byProjectClick = output<Project>();

  public onClick(project: Project) {
    this.byProjectClick.emit(project);
  }
}
