import { ApplicationRef, inject, Injectable } from '@angular/core';

import {
  MkComponentTeleport,
  MkTeleport,
  MkTemplateTeleport,
} from '../interfaces';

import {
  MkComponentTeleportRef,
  MkTemplateTeleportRef,
} from './teleport-ref';

@Injectable({ providedIn: 'root' })
export class MkTeleportService {
  private appRef = inject(ApplicationRef);

  public create<C>(teleport: MkTeleport<C>) {
    switch (teleport.type) {
      case 'component':
        return this.createByComponent(teleport);
      case 'template':
        return this.createByTemplate(teleport);
    }
  }

  public createByComponent<C>(teleport: MkComponentTeleport<C>) {
    return new MkComponentTeleportRef<C>(teleport, this.appRef);
  }

  public createByTemplate<C>(teleport: MkTemplateTeleport<C>) {
    return new MkTemplateTeleportRef<C>(teleport);
  }
}
