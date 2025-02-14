import { Directive, HostListener, inject, output } from '@angular/core';

import { KuduClickOutsideZoneDirective } from './click-outside-zone.directive';

@Directive({
  selector: '[kuduClickOutside]',
  hostDirectives: [KuduClickOutsideZoneDirective],
})
export class KuduClickOutsideDirective {
  private inner = inject(KuduClickOutsideZoneDirective);
  private outer = inject(KuduClickOutsideZoneDirective, {
    skipSelf: true,
    optional: true,
  });

  public byClickOutside = output<Event>();

  @HostListener('document:click', ['$event'])
  public onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    const origin = this.outer || this.inner;

    if (!origin.contains(target)) {
      this.byClickOutside.emit(event);
    }
  }
}
