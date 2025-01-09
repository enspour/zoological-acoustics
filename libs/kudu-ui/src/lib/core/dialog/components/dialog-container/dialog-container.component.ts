import { ChangeDetectionStrategy, Component } from '@angular/core';

import { KuduPortalsService } from '../../../portals';

import { KuduDialogService } from '../../services/dialog.service';
import { kuduDialogPortals } from '../../tokens';
import { DialogPortalComponent } from '../dialog-portal/dialog-portal.component';

@Component({
  selector: 'kudu-dialog-container',
  imports: [DialogPortalComponent],
  templateUrl: './dialog-container.component.html',
  styleUrl: './dialog-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    KuduDialogService,
    { provide: kuduDialogPortals, useClass: KuduPortalsService },
  ],
})
export class KuduDialogContainerComponent {}
