import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import {
  KuduButtonComponent,
  KuduDialogService,
  KuduIconComponent,
  KuduInputComponent,
  KuduInputContainerComponent,
} from '@kudu-ui';

import { CreateProjectModalComponent } from '@kudu/mfr-feature-create-project';

import { UniqueComponent } from '@kudu/mfr-util-unique-component';

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
export class HeaderComponent extends UniqueComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(KuduDialogService);

  public searchTerm = input.required<string>();

  public onSearchTermChange(searchTerm: string) {
    const queryParams = { ...this.route.snapshot.queryParams, searchTerm };
    this.router.navigate([], { queryParams, relativeTo: this.route });
  }

  public onCreateProject() {
    this.dialog.open(CreateProjectModalComponent, {
      hasBackdrop: true,
      minWidth: '400px',
    });
  }
}
