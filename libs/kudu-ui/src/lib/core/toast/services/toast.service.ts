import { DOCUMENT } from '@angular/common';
import {
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';

import {
  KuduComponentTeleport,
  KuduTeleportRef,
  KuduTeleportService,
} from '../../teleport';

import { KuduToastContainerComponent } from '../components/toast-container/toast-container.component';
import { KuduToastComponent } from '../components/toast/toast.component';

export class KuduToastRef {
  constructor(private teleportRef: KuduTeleportRef) {}

  close() {
    this.teleportRef.dispose();
  }
}

export type KuduToastPlacement =
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'top-left'
  | 'top-right';

export class KuduToastConfig {
  injector?: Injector;
  placement?: KuduToastPlacement;
  duration?: number;
  data?: any;
}

export const kuduToastData = new InjectionToken<any>('kudu-ui/toast/data');

@Injectable({ providedIn: 'root' })
export class KuduToastService {
  private document = inject(DOCUMENT);
  private injector = inject(Injector);
  private teleportService = inject(KuduTeleportService);

  private containerRef = this.createContainer();
  private teleportRef: KuduTeleportRef | null = null;

  public open<T>(component: Type<T>, config?: KuduToastConfig): KuduToastRef {
    const injector = Injector.create({
      providers: [
        { provide: KuduToastRef, useFactory: () => toastRef },
        { provide: kuduToastData, useFactory: () => config?.data },
      ],
      parent: config?.injector || this.injector,
    });

    const teleport: KuduComponentTeleport = {
      type: 'component',
      component: KuduToastComponent,
      injector,
      inputs: {
        component,
        config,
      },
    };

    this.teleportRef?.dispose();
    this.teleportRef = this.teleportService.create(teleport);

    const toastRef = new KuduToastRef(this.teleportRef);

    this.teleportRef.attach(this.containerRef!.location.nativeElement);

    return toastRef;
  }

  private createContainer() {
    const teleportRef = this.teleportService.createByComponent({
      type: 'component',
      component: KuduToastContainerComponent,
    });

    teleportRef.attach(this.document.body);

    return teleportRef.ComponentRef;
  }
}
