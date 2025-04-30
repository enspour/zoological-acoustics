import { ApplicationRef, inject, Injectable } from '@angular/core';

import {
  KuduComponentTeleport,
  KuduTeleport,
  KuduTemplateTeleport,
} from '../interfaces';

import {
  KuduComponentTeleportRef,
  KuduTemplateTeleportRef,
} from './teleport-ref';

@Injectable({ providedIn: 'root' })
export class KuduTeleportService {
  private appRef = inject(ApplicationRef);

  public create<C>(teleport: KuduTeleport<C>) {
    switch (teleport.type) {
      case 'component':
        return this.createByComponent(teleport);
      case 'template':
        return this.createByTemplate(teleport);
    }
  }

  public createByComponent<C>(teleport: KuduComponentTeleport<C>) {
    return new KuduComponentTeleportRef<C>(teleport, this.appRef);
  }

  public createByTemplate<C>(teleport: KuduTemplateTeleport<C>) {
    return new KuduTemplateTeleportRef<C>(teleport);
  }
}
