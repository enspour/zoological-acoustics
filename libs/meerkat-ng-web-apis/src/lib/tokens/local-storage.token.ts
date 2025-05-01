import { inject, InjectionToken } from '@angular/core';
import { mkWindow } from './window.token';

export const mkLocalStorage = new InjectionToken<Storage>('mk/local-storage', {
  factory: () => inject(mkWindow).localStorage,
});
