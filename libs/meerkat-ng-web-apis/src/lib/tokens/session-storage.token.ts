import { inject, InjectionToken } from '@angular/core';
import { mkWindow } from './window.token';

export const mkSessionStorage = new InjectionToken<Storage>(
  'mk/session-storage',
  {
    factory: () => inject(mkWindow).sessionStorage,
  },
);
