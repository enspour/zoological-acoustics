import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  output,
} from '@angular/core';

import {
  KuduChipComponent,
  KuduDialogService,
  KuduIconComponent,
  KuduSortConfig,
  KuduSortDirective,
  KuduSortPipe,
  KuduTableComponent,
  KuduTableDataCellComponent,
  KuduTableHeaderComponent,
  KuduTableHeaderSortDirective,
} from '@kudu-ui';

import { ProjectDataField } from '@kudu/domain';

import { ProjectDataFieldsService } from '@kudu/mfr-data-access-projects-data-fields';

import { ConfirmationModalComponent } from '@kudu/mfr-ui-modals';

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
    KuduIconComponent,
    GetTypeAliasPipe,
  ],
  templateUrl: './project-data-field-table.component.html',
  styleUrl: './project-data-field-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDataFieldTableComponent {
  private dialogService = inject(KuduDialogService);
  private projectDataFieldsService = inject(ProjectDataFieldsService);

  public dataFields = input.required<ProjectDataField[]>();

  public sortConfig = model<KuduSortConfig>();

  public byClick = output<ProjectDataField>();
  public byDelete = output<ProjectDataField>();

  public onClick(data: ProjectDataField) {
    this.byClick.emit(data);
  }

  public onDelete(data: ProjectDataField) {
    const dialogRef = this.dialogService.open(ConfirmationModalComponent, {
      data: {
        title: `Удаление поля`,
        description: `Вы уверены, что хотите удалить поле '${data.name}'`,
      },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(async (isConfirm) => {
      if (isConfirm) {
        await this.projectDataFieldsService.delete(data);
      }
    });
  }
}
