import {
  Directive,
  HostListener,
  inject,
  input,
  linkedSignal,
} from '@angular/core';

import { KuduActiveZoneDirective } from '../../active-zone';
import { KuduOverlayOriginDirective } from '../../overlay';
import { KuduZoneDirective } from '../../zone';

@Directive({
  selector: '[kuduPopupTrigger]',
  exportAs: 'kuduPopupTrigger',
  hostDirectives: [
    KuduOverlayOriginDirective,
    KuduZoneDirective,
    KuduActiveZoneDirective,
  ],
})
export class KuduPopupTriggerDirective {
  private activeZoneDirective = inject(KuduActiveZoneDirective);

  public origin = inject(KuduOverlayOriginDirective);

  public _closable = input(true, { alias: 'kuduPopupTriggerClosable' });
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
      this.activeZoneDirective.deactivate();
    } else {
      this.isClicked.set(true);
    }
  }
}
