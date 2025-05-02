import { InjectionToken } from '@angular/core';

import { MkOptions } from '../interfaces/options.interface';

export const mkOptions = new InjectionToken<MkOptions<unknown>>(
  'mk-ui/options',
);
