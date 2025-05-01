import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MkDialogRef, MkIconComponent } from '@meerkat-ui';

import { UniqueComponent } from '@octo/mfr-util-unique-component';

@Component({
  selector: 'lib-header',
  imports: [MkIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {
  private dialogRef = inject(MkDialogRef);

  public onClose() {
    this.dialogRef.close();
  }
}
