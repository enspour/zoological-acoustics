import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { KuduSidebarComponent } from '@kudu-ui';

import { LogoComponent } from '../logo/logo.component';
import { MenuComponent } from '../menu/menu.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'lib-sidebar',
  imports: [
    RouterOutlet,
    KuduSidebarComponent,
    MenuComponent,
    LogoComponent,
    UserComponent,
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
