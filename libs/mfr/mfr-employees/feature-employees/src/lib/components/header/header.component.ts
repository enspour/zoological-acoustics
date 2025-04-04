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

import { InviteEmployeeModalComponent } from '@kudu/mfr-feature-invite-employee';

@Component({
  selector: 'lib-header',
  imports: [
    FormsModule,
    KuduInputComponent,
    KuduInputContainerComponent,
    KuduIconComponent,
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

  public searchTerm = input<string>();

  public onSearchTermChange(searchTerm: string) {
    const queryParams = { ...this.route.snapshot.queryParams, searchTerm };
    this.router.navigate([`/employees`], { queryParams });
  }

  public onInvite() {
    this.dialogService.open(InviteEmployeeModalComponent, {
      hasBackdrop: true,
    });
  }
}
