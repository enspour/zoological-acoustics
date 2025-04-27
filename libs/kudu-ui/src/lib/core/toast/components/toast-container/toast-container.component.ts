import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KuduTeleportPlaceComponent } from '../../../teleports';

import { KuduToastService } from '../../services/toast.service';

@Component({
  selector: 'kudu-toast-container',
  imports: [KuduTeleportPlaceComponent],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [KuduToastService],
})
export class KuduToastContainerComponent {}
