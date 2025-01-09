import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { KuduButtonComponent, KuduDialogData, KuduDialogRef } from '@kudu-ui';

@Component({
  selector: 'app-confirmation',
  imports: [KuduButtonComponent],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModalComponent {
  private dialogRef = inject(KuduDialogRef);

  public data = inject(KuduDialogData);

  public close() {
    this.dialogRef.close(false);
  }

  public confirm() {
    this.dialogRef.close(true);
  }
}
