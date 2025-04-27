import { Injectable, signal } from '@angular/core';

import { KuduTeleport } from '../interfaces';

export interface KuduTeleportRef {
  close: () => void;
}

@Injectable({ providedIn: 'root' })
export class KuduTeleportsService {
  private _teleports = signal<KuduTeleport[]>([]);
  public teleports = this._teleports.asReadonly();

  public open(teleport: KuduTeleport): KuduTeleportRef {
    this._teleports.update((teleports) => [...teleports, teleport]);

    return {
      close: () => this.close(teleport),
    };
  }

  public close(teleport: KuduTeleport) {
    this._teleports.update((teleports) =>
      teleports.filter((t) => t !== teleport),
    );
  }
}
