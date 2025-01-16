import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '@kudu/mfr-feature-sidebar';
import { ExplorerContainerComponent } from '@kudu/mfr-feature-explorer';

@Component({
  selector: 'lib-layout',
  imports: [RouterOutlet, SidebarComponent, ExplorerContainerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
