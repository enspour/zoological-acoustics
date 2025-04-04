import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  KuduButtonComponent,
  KuduDialogService,
  KuduIconComponent,
  KuduInputComponent,
  KuduInputContainerComponent,
} from '@kudu-ui';

import { CreateProjectModalComponent } from '@kudu/mfr-feature-create-project';

@Component({
  selector: 'lib-header',
  imports: [
    FormsModule,
    RouterLink,
    KuduButtonComponent,
    KuduIconComponent,
    KuduInputComponent,
    KuduInputContainerComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private router = inject(Router);
  private dialog = inject(KuduDialogService);

  public searchTerm = input.required<string>();

  public onSearchTermChange(searchTerm: string) {
    this.router.navigateByUrl(`/projects?searchTerm=${searchTerm}`);
  }

  public onCreateProject() {
    this.dialog.open(CreateProjectModalComponent, {
      hasBackdrop: true,
    });
  }
}
