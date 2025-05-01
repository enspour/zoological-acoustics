import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[mkOverlayOrigin]',
  exportAs: 'mkOverlayOrigin',
  host: {
    tabindex: '-1',
  },
})
export class MkOverlayOriginDirective {
  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
