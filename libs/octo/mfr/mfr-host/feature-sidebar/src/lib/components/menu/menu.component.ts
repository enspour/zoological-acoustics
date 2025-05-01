import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  MkIconComponent,
  MkMenuComponent,
  MkMenuLinkComponent,
  MkTooltipDirective,
} from '@meerkat-ui';

import { SidebarComponent } from '../../sidebar.component';

@Component({
  selector: 'lib-menu',
  imports: [
    MkMenuComponent,
    MkMenuLinkComponent,
    MkIconComponent,
    MkTooltipDirective,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private sidebar = inject(SidebarComponent);

  public isOpen = this.sidebar.isOpen;

  public apps = [
    { title: 'Главная', icon: 'home', href: '/' },
    { title: 'Проекты', icon: 'case', href: '/projects' },
    { title: 'Организация', icon: 'users', href: '/organization' },
  ];
}
