import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';

import {
  KuduChipComponent,
  KuduDialogRef,
  KuduIconComponent,
  KuduSizeDirective,
} from '@kudu-ui';

import { ProjectDataField } from '@kudu/domain';

import { GetTypeAliasPipe } from '@kudu/mfr-util-project-data-field';

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
export class HeaderComponent {
  private dialogRef = inject(KuduDialogRef);

  public field = input.required<ProjectDataField>();

  public onClose() {
    this.dialogRef.close();
  }
}
