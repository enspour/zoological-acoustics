import { Directive, HostListener, inject, linkedSignal } from '@angular/core';

import { MkActiveZoneDirective } from '../../active-zone';
import { MkOverlayFlexibleOriginDirective } from '../../overlay';
import { MkZoneDirective } from '../../zone';

import { MkPopupTrigger } from '../interfaces';

import { mkPopupTrigger } from '../tokens';

@Directive({
  selector: '[mkPopupToggler]',
  exportAs: 'mkPopupToggler',
  hostDirectives: [
    MkOverlayFlexibleOriginDirective,
    MkZoneDirective,
    MkActiveZoneDirective,
  ],
  host: {
    tabindex: '0',
  },
  providers: [
    { provide: mkPopupTrigger, useExisting: MkPopupTogglerDirective },
  ],
})
export class MkPopupTogglerDirective implements MkPopupTrigger {
  private activeZoneDirective = inject(MkActiveZoneDirective);

  public origin = inject(MkOverlayFlexibleOriginDirective);
  public isOpen = this.activeZoneDirective.active;

  private isToggled = linkedSignal({
    source: this.isOpen,
    computation: () => false,
  });

  @HostListener('click')
  public onClick() {
    if (this.isToggled()) {
      this.close();
    } else {
      this.isToggled.set(true);
    }
  }

  public close() {
    this.activeZoneDirective.deactivate();
  }
}
