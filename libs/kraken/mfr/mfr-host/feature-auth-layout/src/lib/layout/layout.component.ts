import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ExplorerContainerComponent } from '@kraken/mfr-feature-explorer';
import { SidebarComponent } from '@kraken/mfr-feature-sidebar';

@Component({
  selector: 'lib-layout',
  imports: [RouterOutlet, SidebarComponent, ExplorerContainerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
