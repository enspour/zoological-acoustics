import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MkDialogRef } from '@meerkat-ui';

@Component({
  selector: 'lib-invite-employee-modal',
  imports: [],
  templateUrl: './invite-employee-modal.component.html',
  styleUrl: './invite-employee-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteEmployeeModalComponent {
  private dialogRef = inject(MkDialogRef);
}
