import { DOCUMENT } from '@angular/common';
import {
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';

import {
  MkComponentTeleport,
  MkTeleportRef,
  MkTeleportService,
} from '../../teleport';

import { MkToastContainerComponent } from '../components/toast-container/toast-container.component';
import { MkToastComponent } from '../components/toast/toast.component';

export class MkToastRef {
  constructor(private teleportRef: MkTeleportRef) {}

  close() {
    this.teleportRef.dispose();
  }
}

export type MkToastPlacement =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'top-left'
  | 'top-right';

export class MkToastConfig {
  injector?: Injector;
  placement?: MkToastPlacement;
  duration?: number;
  data?: any;
}

export const mkToastData = new InjectionToken<any>('mk-ui/toast/data');

@Injectable({ providedIn: 'root' })
export class MkToastService {
  private document = inject(DOCUMENT);
  private injector = inject(Injector);
  private teleportService = inject(MkTeleportService);

  private containerRef = this.createContainer();
  private teleportRef: MkTeleportRef | null = null;

  public open<T>(component: Type<T>, config?: MkToastConfig): MkToastRef {
    const injector = Injector.create({
      providers: [
        { provide: MkToastRef, useFactory: () => toastRef },
        { provide: mkToastData, useFactory: () => config?.data },
      ],
      parent: config?.injector || this.injector,
    });

    const teleport: MkComponentTeleport = {
      type: 'component',
      component: MkToastComponent,
      injector,
      inputs: {
        component,
        config,
      },
    };

    this.teleportRef?.dispose();
    this.teleportRef = this.teleportService.create(teleport);

    const toastRef = new MkToastRef(this.teleportRef);

    this.teleportRef.attach(this.containerRef!.location.nativeElement);

    return toastRef;
  }

  private createContainer() {
    const teleportRef = this.teleportService.createByComponent({
      type: 'component',
      component: MkToastContainerComponent,
    });

    teleportRef.attach(this.document.body);

    return teleportRef.ComponentRef;
  }
}
