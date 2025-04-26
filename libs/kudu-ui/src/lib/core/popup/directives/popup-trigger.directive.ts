import { Directive, HostListener, inject, linkedSignal } from '@angular/core';

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

  public isOpen = this.activeZoneDirective.active;
  public isToggled = linkedSignal({
    source: this.isOpen,
    computation: () => false,
  });

  @HostListener('click', ['$event'])
  public onToggle(event: Event) {
    const target = event.target as HTMLElement;

    /**
     * TODO (FIX): figure out how to solve mark elements that should not to close by click
     */
    if (target.getAttribute('kudu.popup.close-on-click') === 'off') {
      return;
    }

    if (this.isToggled()) {
      this.activeZoneDirective.deactivate();
    }

    this.isToggled.set(true);
  }
}
