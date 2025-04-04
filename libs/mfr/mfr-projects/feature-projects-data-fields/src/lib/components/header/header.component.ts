import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  private route = inject(ActivatedRoute);
  private dialogService = inject(KuduDialogService);

  public searchTerm = input.required<string>();

  public onSearchTermChange(searchTerm: string) {
    const queryParams = { ...this.route.snapshot.queryParams, searchTerm };
    this.router.navigate([`/projects/settings/data-fields`], { queryParams });
  }

  public onCreateDataField() {
    this.dialogService.open(CreateProjectDataFieldModalComponent, {
      hasBackdrop: true,
    });
  }
}
