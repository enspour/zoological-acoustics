import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';

import {
  MkIconComponent,
  MkSortConfig,
  MkSortDirective,
  MkSortPipe,
  MkTableComponent,
  MkTableDataCellComponent,
  MkTableHeaderComponent,
  MkTableHeaderSortDirective,
  MkTooltipDirective,
} from '@meerkat-ui';

import { Project } from '@octo/domain';

@Component({
  selector: 'lib-project-table',
  imports: [
    MkTableComponent,
    MkTableDataCellComponent,
    MkTableHeaderComponent,
    MkTableHeaderSortDirective,
    MkSortDirective,
    MkSortPipe,
    MkIconComponent,
    MkTooltipDirective,
  ],
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTableComponent {
  public projects = input.required<Project[]>();

  public sortConfig = model<MkSortConfig>();

  public byProjectClick = output<Project>();

  public onClick(project: Project) {
    this.byProjectClick.emit(project);
  }
}
