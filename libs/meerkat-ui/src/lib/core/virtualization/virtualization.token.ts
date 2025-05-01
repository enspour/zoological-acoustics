import { InjectionToken } from '@angular/core';

import { MkVirtualization } from './virtualization.interface';

export const mkVirtualization = new InjectionToken<
  MkVirtualization<unknown>
>('mk-ui/virtualization');
