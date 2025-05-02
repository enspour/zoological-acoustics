import { InjectionToken } from '@angular/core';

import { MkTab, MkTabContent } from '../interfaces';

export const mkTab = new InjectionToken<MkTab>('mk-ui/tab');

export const mkTabContent = new InjectionToken<MkTabContent>(
  'mk-ui/tab-content',
);
