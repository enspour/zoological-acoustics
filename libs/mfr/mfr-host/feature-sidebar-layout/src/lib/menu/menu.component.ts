import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  KuduIconComponent,
  KuduMenuComponent,
  KuduMenuLinkComponent,
} from '@kudu-ui';

import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'lib-menu',
  imports: [KuduMenuComponent, KuduMenuLinkComponent, KuduIconComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private sidebar = inject(LayoutComponent);

  public isOpen = this.sidebar.isOpen;

  public apps = [
    { title: 'Главная', icon: 'home', href: '/' },
    { title: 'Сотрудники', icon: 'users', href: '/employees' },
  ];
}
