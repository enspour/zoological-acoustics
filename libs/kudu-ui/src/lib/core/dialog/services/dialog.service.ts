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
  KuduPortalByComponent,
  KuduPortalRef,
  KuduPortalsService,
} from '../../portals';

import { KuduGlassmorphismConfig } from '../../glassmorphism';

export class KuduDialogRef<R> {
  private closed = new Subject<R | undefined>();

  constructor(private portalRef: KuduPortalRef) {}

  afterClosed() {
    return this.closed.asObservable();
  }

  close(result?: R) {
    this.portalRef?.close();

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

export const KuduDialogData = new InjectionToken<any>('kudu-ui/dialog/data');

@Injectable()
export class KuduDialogService {
  private injector = inject(Injector);
  private portalsService = inject(KuduPortalsService);

  private portalRef: KuduPortalRef | null = null;

  open<T, R>(component: Type<T>, config?: KuduDialogConfig): KuduDialogRef<R> {
    const injector = Injector.create({
      providers: [
        { provide: KuduDialogRef, useFactory: () => dialogRef },
        { provide: KuduDialogData, useFactory: () => config?.data },
      ],
      parent: config?.injector || this.injector,
    });

    const portal: KuduPortalByComponent = {
      id: 'dialog',
      type: 'component',
      component: KuduDialogComponent,
      injector,
      inputs: {
        component,
        config,
      },
    };

    this.portalRef = this.portalsService.open(portal);
    const dialogRef = new KuduDialogRef<R>(this.portalRef);

    return dialogRef;
  }
}
