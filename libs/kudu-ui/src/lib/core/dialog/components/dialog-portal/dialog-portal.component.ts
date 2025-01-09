import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { KuduPortalComponent, KuduPortalsService } from '../../../portals';

import { kuduDialogPortals } from '../../tokens';

@Component({
  selector: 'kudu-dialog-portal',
  standalone: true,
  imports: [CommonModule, KuduPortalComponent],
  templateUrl: './dialog-portal.component.html',
  styleUrl: './dialog-portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: KuduPortalsService,
      useFactory: () => inject(kuduDialogPortals),
    },
  ],
})
export class DialogPortalComponent {}
