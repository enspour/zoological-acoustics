import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

export const mkWindow = new InjectionToken<Window>('mk/window', {
  factory: () => {
    const document = inject(DOCUMENT);

    if (!document.defaultView) {
      throw new Error('Window is not available');
    }

    return document.defaultView;
  },
});
