import { DOCUMENT } from '@angular/common';
import { Directive, inject } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, skip, startWith } from 'rxjs';

import { MkZoneDirective } from '../../zone';

import { mkActiveElement } from '../tokens';

@Directive({
  selector: '[mkActiveZone]',
  exportAs: 'mkActiveZone',
})
export class MkActiveZoneDirective {
  private document = inject(DOCUMENT);
  private zone = inject(MkZoneDirective, { self: true });
  private parent = inject(MkZoneDirective, {
    skipSelf: true,
    optional: true,
  });

  private activeElement$ = inject(mkActiveElement);
  private active$ = this.activeElement$.pipe(
    map((element) => !!element && this.zone.contains(element)),
    startWith(false),
    distinctUntilChanged(),
    skip(1),
  );

  public active = toSignal(this.active$, { initialValue: false });
  public activeZoneChange = outputFromObservable(this.active$);

  public deactivate() {
    if (this.parent) {
      this.parent.Element.focus();
    } else {
      this.document.dispatchEvent(new Event('mk:active-element:clear'));
    }
  }
}
