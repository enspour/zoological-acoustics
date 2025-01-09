import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KuduMenuComponent, KuduMenuLinkComponent } from '@kudu-ui';

@Component({
  selector: 'lib-menu',
  imports: [KuduMenuComponent, KuduMenuLinkComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {}
