import { Signal } from '@angular/core';

import { MkOverlayFlexibleOriginDirective } from '../../overlay';

export interface MkPopupTrigger {
  origin: MkOverlayFlexibleOriginDirective;
  isOpen: Signal<boolean>;
  close(): void;
}
