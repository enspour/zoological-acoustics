import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { KuduSidebarComponent } from '@kudu-ui';

import { AccountComponent } from './components/account/account.component';
import { LogoComponent } from './components/logo/logo.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'lib-sidebar',
  imports: [
    KuduSidebarComponent,
    MenuComponent,
    LogoComponent,
    AccountComponent,
    LogoutComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public isOpen = signal(false);

  public toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
