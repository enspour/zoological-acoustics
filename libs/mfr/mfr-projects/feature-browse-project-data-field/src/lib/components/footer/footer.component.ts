import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  KuduButtonComponent,
  KuduDialogRef,
  KuduDialogService,
  KuduIconComponent,
} from '@kudu-ui';

import { ConfirmationModalComponent } from '@kudu/mfr-ui-modals';

import { ProjectDataFieldsService } from '@kudu/mfr-data-access-projects-data-fields';

import { UniqueComponent } from '@kudu/mfr-util-unique-component';

import { BrowseProjectDataFieldModalComponent } from '../../browse-project-data-field-modal.component';

@Component({
  selector: 'lib-footer',
  imports: [KuduIconComponent, KuduButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent extends UniqueComponent {
  private modal = inject(BrowseProjectDataFieldModalComponent);

  private dialogService = inject(KuduDialogService);
  private dialogRef = inject(KuduDialogRef);
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
