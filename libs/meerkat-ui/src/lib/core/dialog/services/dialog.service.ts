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
  MkComponentTeleport,
  MkTeleportRef,
  MkTeleportService,
} from '../../teleport';

import { MkGlassmorphismConfig } from '../../glassmorphism';

import { MkDialogContainerComponent } from '../components/dialog-container/dialog-container.component';
import { MkDialogComponent } from '../components/dialog/dialog.component';

export class MkDialogRef<R> {
  private closed = new Subject<R | undefined>();

  constructor(private teleportRef: MkTeleportRef) {}

  afterClosed() {
    return this.closed.asObservable();
  }

  close(result?: R) {
    this.teleportRef.dispose();

    this.closed.next(result);
    this.closed.complete();
  }
}

export class MkDialogConfig {
  injector?: Injector;
  data?: any;
  hasBackdrop?: boolean = false;
  hasGlassmorphism?: boolean = false;
  glassmorphism?: MkGlassmorphismConfig;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
}

export const mkDialogData = new InjectionToken<any>('mk-ui/dialog/data');

@Injectable({ providedIn: 'root' })
export class MkDialogService {
  private document = inject(DOCUMENT);
  private injector = inject(Injector);
  private teleportService = inject(MkTeleportService);

  private containerRef = this.createContainer();

  open<T, R>(component: Type<T>, config?: MkDialogConfig): MkDialogRef<R> {
    const injector = Injector.create({
      providers: [
        { provide: MkDialogRef, useFactory: () => dialogRef },
        { provide: mkDialogData, useFactory: () => config?.data },
      ],
      parent: config?.injector || this.injector,
    });

    const teleport: MkComponentTeleport = {
      type: 'component',
      component: MkDialogComponent,
      injector,
      inputs: {
        component,
        config,
      },
    };

    const teleportRef = this.teleportService.create(teleport);
    const dialogRef = new MkDialogRef<R>(teleportRef);

    teleportRef.attach(this.containerRef!.location.nativeElement);

    return dialogRef;
  }

  private createContainer() {
    const teleportRef = this.teleportService.createByComponent({
      type: 'component',
      component: MkDialogContainerComponent,
    });

    teleportRef.attach(this.document.body);

    return teleportRef.ComponentRef;
  }
}
