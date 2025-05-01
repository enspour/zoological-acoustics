import { Directive, input } from '@angular/core';

import { MkSize } from './size.interface';
import { mkSize } from './size.token';

@Directive({
  selector: '[mkSize]',
  standalone: true,
  providers: [
    {
      provide: mkSize,
      useFactory: (directive: MkSizeDirective) => directive.mkSize,
      deps: [MkSizeDirective],
    },
  ],
})
export class MkSizeDirective {
  public mkSize = input.required<MkSize>();
}
