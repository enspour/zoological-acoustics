import { Directive, inject } from '@angular/core';

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
}
