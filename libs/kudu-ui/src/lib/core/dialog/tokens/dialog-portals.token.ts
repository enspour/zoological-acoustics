import { InjectionToken } from '@angular/core';
import { KuduPortalsService } from '../../portals';

export const kuduDialogPortals = new InjectionToken<KuduPortalsService>(
  'kudu-ui/portals-for-dialog',
);
