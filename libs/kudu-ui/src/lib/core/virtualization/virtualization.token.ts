import { InjectionToken } from '@angular/core';

import { KuduVirtualization } from './virtualization.interface';

export const kuduVirtualizationToken = new InjectionToken<
  KuduVirtualization<unknown>
>('kudu-ui/virtualization');
