import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { KuduDialogData } from '@kudu-ui';

import { DialogData } from './browse-project-data-field-modal.interface';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'lib-browse-project-data-field-modal',
  imports: [HeaderComponent],
  templateUrl: './browse-project-data-field-modal.component.html',
  styleUrl: './browse-project-data-field-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseProjectDataFieldModalComponent {
  private dialogData = inject<DialogData>(KuduDialogData);

  public field = this.dialogData.field;
}
