import { Directive, inject } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, skip, startWith } from 'rxjs';

import { MkZoneDirective } from '../../zone';

import { MkActiveElementService } from '../services/active-element.service';

@Directive({
  selector: '[mkActiveZone]',
  exportAs: 'mkActiveZone',
})
export class MkActiveZoneDirective {
  private zone = inject(MkZoneDirective, { self: true });
  private parent = inject(MkZoneDirective, {
    skipSelf: true,
    optional: true,
  });

  private activeElementService = inject(MkActiveElementService);
  private active$ = this.activeElementService.activeElement$.pipe(
    map((element) => !!element && this.zone.contains(element)),
    startWith(false),
    distinctUntilChanged(),
    skip(1),
  );

  public active = toSignal(this.active$, { initialValue: false });
  public activeZoneChange = outputFromObservable(this.active$);

  public deactivate() {
    if (this.parent) {
      this.activeElementService.set(this.parent.Element);
    } else {
      this.activeElementService.clear();
    }
  }
}
