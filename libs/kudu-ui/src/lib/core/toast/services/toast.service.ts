import {
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';

import {
  KuduTeleportByComponent,
  KuduTeleportRef,
  KuduTeleportsService,
} from '../../teleports';

import { KuduToastComponent } from '../components/toast/toast.component';

export class KuduToastRef {
  constructor(private teleportRef: KuduTeleportRef) {}

  close() {
    this.teleportRef?.close();
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

@Injectable()
export class KuduToastService {
  private injector = inject(Injector);
  private teleportsService = inject(KuduTeleportsService);

  private teleportRef: KuduTeleportRef | null = null;

  public open<T>(component: Type<T>, config?: KuduToastConfig): KuduToastRef {
    const injector = Injector.create({
      providers: [
        { provide: KuduToastRef, useFactory: () => toastRef },
        { provide: kuduToastData, useFactory: () => config?.data },
      ],
      parent: config?.injector || this.injector,
    });

    const teleport: KuduTeleportByComponent = {
      placeId: 'toast',
      type: 'component',
      component: KuduToastComponent,
      injector,
      inputs: {
        component,
        config,
      },
    };

    this.teleportRef?.close();
    this.teleportRef = this.teleportsService.open(teleport);
    const toastRef = new KuduToastRef(this.teleportRef);

    return toastRef;
  }
}
