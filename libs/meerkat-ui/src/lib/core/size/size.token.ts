import { InjectionToken, signal, Signal } from '@angular/core';

import { MkSize } from './size.interface';

export const mkSize = new InjectionToken<Signal<MkSize>>('mk-ui/size', {
  factory: () => signal('md'),
});
