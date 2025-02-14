import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KuduPortalComponent } from '../../../portals';

import { KuduDialogService } from '../../services/dialog.service';

@Component({
  selector: 'kudu-dialog-container',
  imports: [KuduPortalComponent],
  templateUrl: './dialog-container.component.html',
  styleUrl: './dialog-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [KuduDialogService],
})
export class KuduDialogContainerComponent {}
