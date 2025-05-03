import { InjectionToken } from '@angular/core';

import { MkPopupTrigger } from '../interfaces';

export const mkPopupTrigger = new InjectionToken<MkPopupTrigger>(
  'mk-ui/popup-trigger',
);
