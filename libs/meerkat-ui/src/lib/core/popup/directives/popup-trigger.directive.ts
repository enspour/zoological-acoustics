import {
  Directive,
  HostListener,
  inject,
  input,
  linkedSignal,
} from '@angular/core';

import { MkActiveZoneDirective } from '../../active-zone';
import { MkOverlayOriginDirective } from '../../overlay';
import { MkZoneDirective } from '../../zone';

@Directive({
  selector: '[mkPopupTrigger]',
  exportAs: 'mkPopupTrigger',
  hostDirectives: [
    MkOverlayOriginDirective,
    MkZoneDirective,
    MkActiveZoneDirective,
  ],
  host: {
    tabindex: '0',
  },
})
export class MkPopupTriggerDirective {
  private activeZoneDirective = inject(MkActiveZoneDirective);

  public origin = inject(MkOverlayOriginDirective);

  public _closable = input(true, { alias: 'mkPopupTriggerClosable' });
  public closable = linkedSignal(() => this._closable());

  public isOpen = this.activeZoneDirective.active;
  private isClicked = linkedSignal({
    source: this.isOpen,
    computation: () => false,
  });

  @HostListener('click')
  public onClick() {
    if (!this.closable()) {
      return;
    }

    if (this.isClicked()) {
      this.close();
    } else {
      this.isClicked.set(true);
    }
  }

  public close() {
    this.activeZoneDirective.deactivate();
  }
}
