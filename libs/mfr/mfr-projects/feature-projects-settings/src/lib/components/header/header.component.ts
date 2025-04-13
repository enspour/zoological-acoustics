import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuduIconComponent } from '@kudu-ui';

import { TabLinkComponent, TabsComponent } from '@kudu/mfr-ui-kit';

import { UniqueComponent } from '@kudu/mfr-util-unique-component';

@Component({
  selector: 'lib-header',
  imports: [RouterLink, KuduIconComponent, TabLinkComponent, TabsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {}
