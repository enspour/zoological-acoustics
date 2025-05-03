import { InjectionToken } from '@angular/core';

import { MkOverlayPosition } from '../interfaces';

export const mkOverlayPosition = new InjectionToken<MkOverlayPosition>(
  'mk-ui/overlay/position',
);
