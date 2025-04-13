import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  KuduChipComponent,
  KuduDialogRef,
  KuduIconComponent,
  KuduSizeDirective,
} from '@kudu-ui';

import { GetTypeAliasPipe } from '@kudu/mfr-util-project-data-field';

import { UniqueComponent } from '@kudu/mfr-util-unique-component';

import { BrowseProjectDataFieldModalComponent } from '../../browse-project-data-field-modal.component';

@Component({
  selector: 'lib-header',
  imports: [
    KuduIconComponent,
    KuduChipComponent,
    KuduSizeDirective,
    GetTypeAliasPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {
  private modal = inject(BrowseProjectDataFieldModalComponent);
  private dialogRef = inject(KuduDialogRef);

  public field = this.modal.field;

  public onClose() {
    this.dialogRef.close();
  }
}
