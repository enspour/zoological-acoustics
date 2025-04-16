import { Directive, HostListener, inject, output } from '@angular/core';

import { KuduZoneDirective } from '../zone';

@Directive({
  selector: '[kuduClickOutside]',
})
export class KuduClickOutsideDirective {
  private inner = inject(KuduZoneDirective, { self: true });
  private outer = inject(KuduZoneDirective, {
    skipSelf: true,
    optional: true,
  });

  public byClickOutside = output<Event>({
    alias: 'kuduClickOutside',
  });

  @HostListener('document:mousedown', ['$event'])
  public onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    const origin = this.outer || this.inner;

    if (!origin.contains(target)) {
      this.byClickOutside.emit(event);
    }
  }
}
