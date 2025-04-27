import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KuduTeleportPlaceComponent } from '../../../teleports';

import { KuduDialogService } from '../../services/dialog.service';

@Component({
  selector: 'kudu-dialog-container',
  imports: [KuduTeleportPlaceComponent],
  templateUrl: './dialog-container.component.html',
  styleUrl: './dialog-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [KuduDialogService],
})
export class KuduDialogContainerComponent {}
