import { InjectionToken, signal, Signal } from '@angular/core';

import { KuduSize } from './size.interface';

export const kuduSize = new InjectionToken<Signal<KuduSize>>('kudu-ui/size', {
  factory: () => signal('md'),
});
