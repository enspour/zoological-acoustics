import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  output,
} from '@angular/core';

import {
  MkChipComponent,
  MkDialogService,
  MkIconComponent,
  MkSortConfig,
  MkSortDirective,
  MkSortPipe,
  MkTableComponent,
  MkTableDataCellComponent,
  MkTableHeaderComponent,
  MkTableHeaderSortDirective,
} from '@meerkat-ui';

import { ProjectDataField } from '@octo/domain';

import { ProjectDataFieldsService } from '@octo/mfr-data-access-projects-data-fields';

import { ConfirmationModalComponent } from '@octo/mfr-ui-modals';

import { GetTypeAliasPipe } from '@octo/mfr-util-project-data-field';

@Component({
  selector: 'lib-project-data-field-table',
  imports: [
    MkTableComponent,
    MkTableDataCellComponent,
    MkTableHeaderComponent,
    MkTableHeaderSortDirective,
    MkSortDirective,
    MkSortPipe,
    MkChipComponent,
    MkIconComponent,
    GetTypeAliasPipe,
  ],
  templateUrl: './project-data-field-table.component.html',
  styleUrl: './project-data-field-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDataFieldTableComponent {
  private dialogService = inject(MkDialogService);
  private projectDataFieldsService = inject(ProjectDataFieldsService);

  public dataFields = input.required<ProjectDataField[]>();

  public sortConfig = model<MkSortConfig>();

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
