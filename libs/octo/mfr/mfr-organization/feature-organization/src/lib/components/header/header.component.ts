import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UniqueComponent } from '@octo/mfr-util-unique-component';

import { TabLinkComponent, TabsComponent } from '@octo/mfr-ui-kit';

@Component({
  selector: 'lib-header',
  imports: [TabsComponent, TabLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {}
