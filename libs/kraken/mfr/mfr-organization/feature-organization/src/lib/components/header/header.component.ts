import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UniqueComponent } from '@kraken/mfr-util-unique-component';

import { TabLinkComponent, TabsComponent } from '@kraken/mfr-ui-kit';

@Component({
  selector: 'lib-header',
  imports: [TabsComponent, TabLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {}
