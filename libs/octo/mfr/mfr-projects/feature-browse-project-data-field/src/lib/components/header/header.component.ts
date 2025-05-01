import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  MkChipComponent,
  MkDialogRef,
  MkIconComponent,
  MkSizeDirective,
} from '@meerkat-ui';

import { GetTypeAliasPipe } from '@octo/mfr-util-project-data-field';

import { UniqueComponent } from '@octo/mfr-util-unique-component';

import { BrowseProjectDataFieldModalComponent } from '../../browse-project-data-field-modal.component';

@Component({
  selector: 'lib-header',
  imports: [
    MkIconComponent,
    MkChipComponent,
    MkSizeDirective,
    GetTypeAliasPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {
  private modal = inject(BrowseProjectDataFieldModalComponent);
  private dialogRef = inject(MkDialogRef);

  public field = this.modal.field;

  public onClose() {
    this.dialogRef.close();
  }
}
