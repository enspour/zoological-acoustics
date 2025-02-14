import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { UserService } from '@kudu/mfr-data-access-user';

import { EmployeeAvatarComponent } from '@kudu/mfr-ui-employee';

import { SidebarComponent } from '../../sidebar.component';

@Component({
  selector: 'lib-account',
  imports: [EmployeeAvatarComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  private userService = inject(UserService);
  private sidebar = inject(SidebarComponent);

  public isOpen = this.sidebar.isOpen;

  public user = this.userService.user;
}
