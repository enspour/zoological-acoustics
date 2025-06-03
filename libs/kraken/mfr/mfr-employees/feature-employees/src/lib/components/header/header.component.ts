import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  MkButtonComponent,
  MkDialogService,
  MkIconComponent,
  MkInputComponent,
  MkInputContainerComponent,
} from '@meerkat-ui';

import { InviteEmployeeModalComponent } from '@kraken/mfr-feature-invite-employee';

import { UniqueComponent } from '@kraken/mfr-util-unique-component';

@Component({
  selector: 'lib-header',
  imports: [
    FormsModule,
    MkInputComponent,
    MkInputContainerComponent,
    MkIconComponent,
    MkButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialogService = inject(MkDialogService);

  public searchTerm = input<string>();

  public onSearchTermChange(searchTerm: string) {
    const queryParams = { ...this.route.snapshot.queryParams, searchTerm };
    this.router.navigate([], { queryParams, relativeTo: this.route });
  }

  public onInvite() {
    this.dialogService.open(InviteEmployeeModalComponent, {
      hasBackdrop: true,
    });
  }
}
