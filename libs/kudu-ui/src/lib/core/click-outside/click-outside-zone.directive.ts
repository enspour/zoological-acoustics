import { Directive, inject } from '@angular/core';

import { KuduZoneDirective } from '../zone';

@Directive({
  selector: '[kuduClickOutsideZone]',
  hostDirectives: [KuduZoneDirective],
})
export class KuduClickOutsideZoneDirective {
  private zone = inject(KuduZoneDirective);

  public contains(target: HTMLElement): boolean {
    return this.zone.contains(target);
  }
}
