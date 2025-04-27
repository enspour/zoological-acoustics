import {
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
import { Subject } from 'rxjs';

import { KuduDialogComponent } from '../components/dialog/dialog.component';

import {
  KuduTeleportByComponent,
  KuduTeleportRef,
  KuduTeleportsService,
} from '../../teleports';

import { KuduGlassmorphismConfig } from '../../glassmorphism';

export class KuduDialogRef<R> {
  private closed = new Subject<R | undefined>();

  constructor(private teleportRef: KuduTeleportRef) {}

  afterClosed() {
    return this.closed.asObservable();
  }

  close(result?: R) {
    this.teleportRef?.close();

    this.closed.next(result);
    this.closed.complete();
  }
}

export class KuduDialogConfig {
  injector?: Injector;
  data?: any;
  hasBackdrop?: boolean = false;
  hasGlassmorphism?: boolean = false;
  glassmorphism?: KuduGlassmorphismConfig;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
}

export const kuduDialogData = new InjectionToken<any>('kudu-ui/dialog/data');

@Injectable()
export class KuduDialogService {
  private injector = inject(Injector);
  private teleportsService = inject(KuduTeleportsService);

  open<T, R>(component: Type<T>, config?: KuduDialogConfig): KuduDialogRef<R> {
    const injector = Injector.create({
      providers: [
        { provide: KuduDialogRef, useFactory: () => dialogRef },
        { provide: kuduDialogData, useFactory: () => config?.data },
      ],
      parent: config?.injector || this.injector,
    });

    const teleport: KuduTeleportByComponent = {
      placeId: 'dialog',
      type: 'component',
      component: KuduDialogComponent,
      injector,
      inputs: {
        component,
        config,
      },
    };

    const teleportRef = this.teleportsService.open(teleport);
    const dialogRef = new KuduDialogRef<R>(teleportRef);

    return dialogRef;
  }
}
