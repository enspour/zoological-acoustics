import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuduIconComponent } from '@kudu-ui';

import { TabLinkComponent, TabsComponent } from '@kudu/mfr-ui-kit';

@Component({
  selector: 'lib-header',
  imports: [RouterLink, KuduIconComponent, TabLinkComponent, TabsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
