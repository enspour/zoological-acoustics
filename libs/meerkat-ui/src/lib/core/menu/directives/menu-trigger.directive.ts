import { Directive, inject } from '@angular/core';

import { MkPopupTogglerDirective } from '../../popup';

@Directive({
  selector: '[mkMenuTrigger]',
  exportAs: 'mkMenuTrigger',
  hostDirectives: [MkPopupTogglerDirective],
  host: {
    tabindex: '-1',
  },
})
export class MkMenuTriggerDirective {
  private trigger = inject(MkPopupTogglerDirective);

  public isOpen = this.trigger.isOpen;

  public close() {
    this.trigger.close();
  }
}
