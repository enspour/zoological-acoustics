import {
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
import { Subject } from 'rxjs';

import { KuduDialogComponent } from '../components/dialog/dialog.component';

import { KuduPortalByComponent, KuduPortalRef } from '../../portals';

import { kuduDialogPortals } from '../tokens';

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
  data?: any;
  hasBackdrop?: boolean = false;
  hasGlassmorphism?: boolean = false;
  glassmorphism?: KuduGlassmorphismConfig;
}

export const KuduDialogData = new InjectionToken<any>('kudu-ui/dialog/data');

@Injectable()
export class KuduDialogService {
  private injector = inject(Injector);
  private portalsService = inject(kuduDialogPortals);

  private portalRef: KuduPortalRef | null = null;
  private dialogRef: KuduDialogRef<any> | null = null;

  open<T, R>(component: Type<T>, config?: KuduDialogConfig): KuduDialogRef<R> {
    this.dialogRef?.close();

    const injector = Injector.create({
      providers: [
        { provide: KuduDialogRef, useFactory: () => this.dialogRef },
        { provide: KuduDialogData, useFactory: () => config?.data },
      ],
      parent: this.injector,
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
    this.dialogRef = new KuduDialogRef(this.portalRef);

    return this.dialogRef;
  }
}
