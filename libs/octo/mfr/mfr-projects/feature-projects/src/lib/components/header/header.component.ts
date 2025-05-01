import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import {
  MkButtonComponent,
  MkDialogService,
  MkIconComponent,
  MkInputComponent,
  MkInputContainerComponent,
} from '@meerkat-ui';

import { CreateProjectModalComponent } from '@octo/mfr-feature-create-project';

import { UniqueComponent } from '@octo/mfr-util-unique-component';

@Component({
  selector: 'lib-header',
  imports: [
    FormsModule,
    RouterLink,
    MkButtonComponent,
    MkIconComponent,
    MkInputComponent,
    MkInputContainerComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MkDialogService);

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
