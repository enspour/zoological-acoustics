import { inject, Injectable, signal } from '@angular/core';

import { LocalStorageService } from '@kudu/mfr-util-local-storage';

import { GanttZoom } from './interfaces';

const LS_GANTT_TOOLBAR_ZOOM = '__v1/gantt/toolbar/zoom';

@Injectable()
export class GanttToolbarService {
  private localStorageService = inject(LocalStorageService);

  private _zoom = signal<GanttZoom>(this.getInitialZoom());
  public zoom = this._zoom.asReadonly();

  public setZoom(zoom: GanttZoom) {
    this._zoom.set(zoom);
    this.localStorageService.set(LS_GANTT_TOOLBAR_ZOOM, zoom);
  }

  public getInitialZoom() {
    return (
      this.localStorageService.get<GanttZoom>(LS_GANTT_TOOLBAR_ZOOM) || 'days'
    );
  }
}
