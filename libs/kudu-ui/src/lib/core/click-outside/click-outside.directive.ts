import { Directive, HostListener, inject, output } from '@angular/core';

import { KuduZoneDirective } from '../zone';

@Directive({
  selector: '[kuduClickOutside]',
})
export class KuduClickOutsideDirective {
  private zone = inject(KuduZoneDirective, { optional: true });

  public byClickOutside = output<Event>();

  @HostListener('document:click', ['$event'])
  public onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    if (!this.zone?.contains(target)) {
      this.byClickOutside.emit(event);
    }
  }
}
