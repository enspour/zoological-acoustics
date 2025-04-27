import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KuduTeleportPlaceComponent } from '../../../teleports';

@Component({
  selector: 'kudu-overlay-container',
  imports: [KuduTeleportPlaceComponent],
  templateUrl: './overlay-container.component.html',
  styleUrl: './overlay-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduOverlayContainerComponent {}
