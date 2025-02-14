import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { KuduButtonComponent, KuduIconComponent } from '@kudu-ui';

import { AuthService } from '@kudu/mfr-data-access-auth';

import { SidebarComponent } from '../../sidebar.component';

@Component({
  selector: 'lib-logout',
  imports: [KuduIconComponent, KuduButtonComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  private sidebar = inject(SidebarComponent);

  public isOpen = this.sidebar.isOpen;

  public async onLogout() {
    const response = await this.authService.logout();

    if (response.statusCode === 200) {
      this.router.navigateByUrl('/login');
    }
  }
}
