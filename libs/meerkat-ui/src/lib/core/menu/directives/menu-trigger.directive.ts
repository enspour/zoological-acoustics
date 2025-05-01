import { Directive, inject } from '@angular/core';

import { MkPopupTriggerDirective } from '../../popup';

@Directive({
  selector: '[mkMenuTrigger]',
  exportAs: 'mkMenuTrigger',
  hostDirectives: [MkPopupTriggerDirective],
  host: {
    tabindex: '-1',
  },
})
export class MkMenuTriggerDirective {
  private trigger = inject(MkPopupTriggerDirective);

  public isOpen = this.trigger.isOpen;

  public close() {
    this.trigger.close();
  }
}
