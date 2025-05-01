import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';

import {
  MkSortConfig,
  MkSortDirective,
  MkSortPipe,
  MkTableComponent,
  MkTableDataCellComponent,
  MkTableHeaderComponent,
  MkTableHeaderSortDirective,
} from '@meerkat-ui';

import { ProjectMember } from '@octo/domain';

import { EmployeeAvatarComponent } from '@octo/mfr-ui-employee';

@Component({
  selector: 'lib-project-member-table',
  imports: [
    MkTableComponent,
    MkTableDataCellComponent,
    MkTableHeaderComponent,
    MkTableHeaderSortDirective,
    MkSortDirective,
    MkSortPipe,
    EmployeeAvatarComponent,
  ],
  templateUrl: './project-member-table.component.html',
  styleUrl: './project-member-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMemberTableComponent {
  public members = input.required<ProjectMember[]>();

  public sortConfig = model<MkSortConfig>();

  public byMemberClick = output<ProjectMember>();

  public onClick(member: ProjectMember) {
    this.byMemberClick.emit(member);
  }
}
