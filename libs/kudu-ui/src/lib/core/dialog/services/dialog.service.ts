import { DOCUMENT } from '@angular/common';
import {
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
import { Subject } from 'rxjs';

import {
  KuduComponentTeleport,
  KuduTeleportRef,
  KuduTeleportService,
} from '../../teleport';

import { KuduGlassmorphismConfig } from '../../glassmorphism';

import { KuduDialogContainerComponent } from '../components/dialog-container/dialog-container.component';
import { KuduDialogComponent } from '../components/dialog/dialog.component';

export class KuduDialogRef<R> {
  private closed = new Subject<R | undefined>();

  constructor(private teleportRef: KuduTeleportRef) {}

  afterClosed() {
    return this.closed.asObservable();
  }

  close(result?: R) {
    this.teleportRef.dispose();

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

@Injectable({ providedIn: 'root' })
export class KuduDialogService {
  private document = inject(DOCUMENT);
  private injector = inject(Injector);
  private teleportService = inject(KuduTeleportService);

  private containerRef = this.createContainer();

  open<T, R>(component: Type<T>, config?: KuduDialogConfig): KuduDialogRef<R> {
    const injector = Injector.create({
      providers: [
        { provide: KuduDialogRef, useFactory: () => dialogRef },
        { provide: kuduDialogData, useFactory: () => config?.data },
      ],
      parent: config?.injector || this.injector,
    });

    const teleport: KuduComponentTeleport = {
      type: 'component',
      component: KuduDialogComponent,
      injector,
      inputs: {
        component,
        config,
      },
    };

    const teleportRef = this.teleportService.create(teleport);
    const dialogRef = new KuduDialogRef<R>(teleportRef);

    teleportRef.attach(this.containerRef!.location.nativeElement);

    return dialogRef;
  }

  private createContainer() {
    const teleportRef = this.teleportService.createByComponent({
      type: 'component',
      component: KuduDialogContainerComponent,
    });

    teleportRef.attach(this.document.body);

    return teleportRef.ComponentRef;
  }
}
