import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  KuduButtonComponent,
  KuduDialogService,
  KuduIconComponent,
  KuduInputComponent,
  KuduInputContainerComponent,
} from '@kudu-ui';

import { CreateProjectDataFieldModalComponent } from '@kudu/mfr-feature-create-project-data-field';

@Component({
  selector: 'lib-header',
  imports: [
    FormsModule,
    KuduIconComponent,
    KuduInputComponent,
    KuduInputContainerComponent,
    KuduButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private router = inject(Router);
  private dialogService = inject(KuduDialogService);

  public searchTerm = input.required<string>();

  public onSearchTermChange(searchTerm: string) {
    this.router.navigateByUrl(
      `/projects/settings/data-fields?searchTerm=${searchTerm}`,
    );
  }

  public onCreateDataField() {
    this.dialogService.open(CreateProjectDataFieldModalComponent, {
      hasBackdrop: true,
    });
  }
}
