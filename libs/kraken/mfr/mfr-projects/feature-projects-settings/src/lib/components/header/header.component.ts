import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MkIconComponent } from '@meerkat-ui';

import { TabLinkComponent, TabsComponent } from '@kraken/mfr-ui-kit';

import { UniqueComponent } from '@kraken/mfr-util-unique-component';

@Component({
  selector: 'lib-header',
  imports: [RouterLink, MkIconComponent, TabLinkComponent, TabsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends UniqueComponent {}
