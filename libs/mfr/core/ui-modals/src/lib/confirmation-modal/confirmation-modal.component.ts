import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  KuduButtonComponent,
  kuduDialogData,
  KuduDialogRef,
  KuduIconComponent,
} from '@kudu-ui';

@Component({
  selector: 'lib-confirmation',
  imports: [KuduButtonComponent, KuduIconComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModalComponent {
  private dialogRef = inject(KuduDialogRef);

  public data = inject(kuduDialogData);

  public onClose() {
    this.dialogRef.close(false);
  }

  public onConfirm() {
    this.dialogRef.close(true);
  }
}
