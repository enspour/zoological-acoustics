import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

import {
  KuduChipComponent,
  KuduSortDirective,
  KuduSortPipe,
  KuduTableComponent,
  KuduTableDataCellComponent,
  KuduTableHeaderComponent,
  KuduTableHeaderSortDirective,
} from '@kudu-ui';

import { ProjectDataField } from '@kudu/domain';

import { GetTypeAliasPipe } from '@kudu/mfr-util-project-data-field';

@Component({
  selector: 'lib-project-data-field-table',
  imports: [
    KuduTableComponent,
    KuduTableDataCellComponent,
    KuduTableHeaderComponent,
    KuduTableHeaderSortDirective,
    KuduSortDirective,
    KuduSortPipe,
    KuduChipComponent,
    GetTypeAliasPipe,
  ],
  templateUrl: './project-data-field-table.component.html',
  styleUrl: './project-data-field-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDataFieldTableComponent {
  public dataFields = input.required<ProjectDataField[]>();

  public byClick = output<ProjectDataField>();

  public onClick(data: ProjectDataField) {
    this.byClick.emit(data);
  }
}
