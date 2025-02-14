import { Injectable, signal } from '@angular/core';

import { KuduPortal } from '../interfaces/portal.interface';

export interface KuduPortalRef {
  close: () => void;
}

@Injectable({ providedIn: 'root' })
export class KuduPortalsService {
  private _portals = signal<KuduPortal[]>([]);
  public portals = this._portals.asReadonly();

  public open(portal: KuduPortal) {
    this._portals.update((portals) => [...portals, portal]);

    return {
      close: () => this.close(portal),
    };
  }

  public close(portal: KuduPortal) {
    this._portals.update((portals) => portals.filter((p) => p !== portal));
  }
}
