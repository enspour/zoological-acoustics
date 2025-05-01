import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';

import { MkButtonComponent } from '@meerkat-ui';

import { SidebarComponent } from '../../sidebar.component';

@Component({
  selector: 'lib-logo',
  imports: [MkButtonComponent],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  private sidebar = inject(SidebarComponent);

  @HostListener('click')
  public onToggle() {
    this.sidebar.toggle();
  }
}
