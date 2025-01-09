import { Directive, input } from '@angular/core';

import { KuduSize } from './size.interface';
import { kuduSize } from './size.token';

@Directive({
  selector: '[kuduSize]',
  standalone: true,
  providers: [
    {
      provide: kuduSize,
      useFactory: (directive: KuduSizeDirective) => directive.kuduSize,
      deps: [KuduSizeDirective],
    },
  ],
})
export class KuduSizeDirective {
  public kuduSize = input.required<KuduSize>();
}
