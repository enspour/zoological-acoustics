import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';

import {
  KuduSortConfig,
  KuduSortDirective,
  KuduSortPipe,
  KuduTableComponent,
  KuduTableDataCellComponent,
  KuduTableHeaderComponent,
  KuduTableHeaderSortDirective,
} from '@kudu-ui';

import { ProjectMember } from '@kudu/domain';

import { EmployeeAvatarComponent } from '@kudu/mfr-ui-employee';

@Component({
  selector: 'lib-project-member-table',
  imports: [
    KuduTableComponent,
    KuduTableDataCellComponent,
    KuduTableHeaderComponent,
    KuduTableHeaderSortDirective,
    KuduSortDirective,
    KuduSortPipe,
    EmployeeAvatarComponent,
  ],
  templateUrl: './project-member-table.component.html',
  styleUrl: './project-member-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectMemberTableComponent {
  public members = input.required<ProjectMember[]>();

  public sortConfig = model<KuduSortConfig>();

  public byMemberClick = output<ProjectMember>();

  public onClick(member: ProjectMember) {
    this.byMemberClick.emit(member);
  }
}
