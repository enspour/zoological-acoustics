import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  MkButtonComponent,
  mkDialogData,
  MkDialogRef,
  MkIconComponent,
} from '@meerkat-ui';

@Component({
  selector: 'lib-confirmation',
  imports: [MkButtonComponent, MkIconComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModalComponent {
  private dialogRef = inject(MkDialogRef);

  public data = inject(mkDialogData);

  public onClose() {
    this.dialogRef.close(false);
  }

  public onConfirm() {
    this.dialogRef.close(true);
  }
}
