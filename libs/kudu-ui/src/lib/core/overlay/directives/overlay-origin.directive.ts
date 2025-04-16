import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[kuduOverlayOrigin]',
  exportAs: 'kuduOverlayOrigin',
  host: {
    tabindex: '-1',
  },
})
export class KuduOverlayOriginDirective {
  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
