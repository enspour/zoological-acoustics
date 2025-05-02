import { InjectionToken } from '@angular/core';

import { MkOption } from '../interfaces';

export const mkOption = new InjectionToken<MkOption<unknown>>('mk-ui/option');
