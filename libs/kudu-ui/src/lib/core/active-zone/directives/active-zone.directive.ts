import { DOCUMENT } from '@angular/common';
import { Directive, inject } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map, skip, startWith } from 'rxjs';

import { KuduZoneDirective } from '../../zone';

import { kuduActiveElement } from '../tokens';

@Directive({
  selector: '[kuduActiveZone]',
  exportAs: 'kuduActiveZone',
})
export class KuduActiveZoneDirective {
  private document = inject(DOCUMENT);
  private zone = inject(KuduZoneDirective, { self: true });
  private parent = inject(KuduZoneDirective, {
    skipSelf: true,
    optional: true,
  });

  private activeElement$ = inject(kuduActiveElement);
  private active$ = this.activeElement$.pipe(
    map((element) => !!element && this.zone.contains(element)),
    startWith(false),
    distinctUntilChanged(),
    skip(1),
  );

  public active = toSignal(this.active$, { initialValue: false });
  public activeZoneChange = outputFromObservable(this.active$);

  public deactivate() {
    this.document.body.tabIndex = -1;

    const element = this.parent?.Element || this.document.body;
    element.focus();
  }
}
