import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';

import { MkZoneDirective } from '../zone';

@Directive({
  selector: '[mkClickOutside]',
})
export class MkClickOutsideDirective {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private inner = inject(MkZoneDirective, { self: true, optional: true });
  private outer = inject(MkZoneDirective, {
    skipSelf: true,
    optional: true,
  });

  public byClickOutside = output<Event>({
    alias: 'mkClickOutside',
  });

  @HostListener('document:mousedown', ['$event'])
  public onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    const origin = this.outer || this.inner || this.elementRef.nativeElement;

    if (!origin.contains(target)) {
      this.byClickOutside.emit(event);
    }
  }
}
