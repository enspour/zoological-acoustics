import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[kuduOverlayOrigin]',
  exportAs: 'kuduOverlayOrigin',
})
export class KuduOverlayOriginDirective {
  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
