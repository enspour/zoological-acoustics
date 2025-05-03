import { Directive, ElementRef, inject } from '@angular/core';

import { MkOverlayFlexibleOrigin } from '../interfaces';

@Directive({
  selector: '[mkOverlayFlexibleOrigin]',
  exportAs: 'mkOverlayFlexibleOrigin',
  host: {
    tabindex: '-1',
  },
})
export class MkOverlayFlexibleOriginDirective
  implements MkOverlayFlexibleOrigin
{
  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
}
