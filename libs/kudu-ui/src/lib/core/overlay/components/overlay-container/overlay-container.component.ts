import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KuduPortalComponent } from '../../../portals';

@Component({
  selector: 'kudu-overlay-container',
  imports: [KuduPortalComponent],
  templateUrl: './overlay-container.component.html',
  styleUrl: './overlay-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduOverlayContainerComponent {}
