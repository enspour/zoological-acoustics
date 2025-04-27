import { Directive, inject } from '@angular/core';

import { KuduPopupTriggerDirective } from '../../popup';

@Directive({
  selector: '[kuduMenuTrigger]',
  exportAs: 'kuduMenuTrigger',
  hostDirectives: [KuduPopupTriggerDirective],
  host: {
    tabindex: '-1',
  },
})
export class KuduMenuTriggerDirective {
  private trigger = inject(KuduPopupTriggerDirective);

  public isOpen = this.trigger.isOpen;

  public close() {
    this.trigger.close();
  }
}
