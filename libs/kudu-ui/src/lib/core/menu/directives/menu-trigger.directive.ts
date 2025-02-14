import { Directive } from '@angular/core';

import { KuduOverlayOriginDirective } from '../../overlay';

@Directive({
  selector: '[kuduMenuTrigger]',
  exportAs: 'kuduMenuTrigger',
})
export class KuduMenuTriggerDirective extends KuduOverlayOriginDirective {}
