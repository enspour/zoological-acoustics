import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { KuduButtonComponent } from '@kudu-ui';
import { AuthService } from '@kudu/mfr-data-access-auth';
import { UserService } from '@kudu/mfr-data-access-user';
import { UserAvatarComponent } from '@kudu/mfr-ui-general';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'lib-user',
  imports: [KuduButtonComponent, UserAvatarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private sidebar = inject(SidebarComponent);

  public isOpen = this.sidebar.isOpen;

  public user = this.userService.user;

  public async onLogout() {
    const response = await this.authService.logout();

    if (response.statusCode === 200) {
      this.router.navigateByUrl('/login');
    }
  }
}
