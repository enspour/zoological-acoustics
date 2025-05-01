import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  MkButtonComponent,
  MkDialogRef,
  MkDialogService,
  MkIconComponent,
} from '@meerkat-ui';

import { ConfirmationModalComponent } from '@octo/mfr-ui-modals';

import { ProjectDataFieldsService } from '@octo/mfr-data-access-projects-data-fields';

import { UniqueComponent } from '@octo/mfr-util-unique-component';

import { BrowseProjectDataFieldModalComponent } from '../../browse-project-data-field-modal.component';

@Component({
  selector: 'lib-footer',
  imports: [MkIconComponent, MkButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent extends UniqueComponent {
  private modal = inject(BrowseProjectDataFieldModalComponent);

  private dialogService = inject(MkDialogService);
  private dialogRef = inject(MkDialogRef);
  private projectDataFieldsService = inject(ProjectDataFieldsService);

  public field = this.modal.field;
  public form = this.modal.form;

  public async onSave() {
    const field = await this.projectDataFieldsService.update({
      uuid: this.field.uuid,
      ...this.form.getRawValue(),
    });

    this.dialogRef.close(field);
  }

  public onDelete() {
    const dialogRef = this.dialogService.open(ConfirmationModalComponent, {
      data: {
        title: `Удаление поля`,
        description: `Вы уверены, что хотите удалить поле '${this.field.name}'`,
      },
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe(async (isConfirm) => {
      if (isConfirm) {
        await this.projectDataFieldsService.delete(this.field);
      }
    });
  }
}
