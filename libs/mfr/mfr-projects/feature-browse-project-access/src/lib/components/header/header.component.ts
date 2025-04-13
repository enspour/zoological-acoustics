import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { KuduDialogRef, KuduIconComponent } from '@kudu-ui';

import { UniqueComponent } from '@kudu/mfr-util-unique-component';

@Component({
  selector: 'lib-header',
  imports: [KuduIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {
  private dialogRef = inject(KuduDialogRef);

  public onClose() {
    this.dialogRef.close();
  }
}
