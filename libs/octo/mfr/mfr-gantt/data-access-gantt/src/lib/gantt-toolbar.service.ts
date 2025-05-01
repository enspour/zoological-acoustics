import { inject, Injectable, signal } from '@angular/core';

import { LocalStorageService } from '@octo/mfr-util-local-storage';

import { GanttGrouping, GanttZoom } from './interfaces';

const LS_GANTT_TOOLBAR_ZOOM = '__v1/gantt/toolbar/zoom';
const LS_GANTT_TOOLBAR_GROUPING = '__v1/gantt/toolbar/grouping';

@Injectable()
export class GanttToolbarService {
  private localStorageService = inject(LocalStorageService);

  private _zoom = signal<GanttZoom>(this.getInitialZoom());
  public zoom = this._zoom.asReadonly();

  private _grouping = signal<GanttGrouping>(this.getInitialGrouping());
  public grouping = this._grouping.asReadonly();

  public setZoom(zoom: GanttZoom) {
    this._zoom.set(zoom);
    this.localStorageService.set(LS_GANTT_TOOLBAR_ZOOM, zoom);
  }

  private getInitialZoom() {
    return (
      this.localStorageService.get<GanttZoom>(LS_GANTT_TOOLBAR_ZOOM) || 'days'
    );
  }

  public setGrouping(grouping: GanttGrouping) {
    this._grouping.set(grouping);
    this.localStorageService.set(LS_GANTT_TOOLBAR_GROUPING, grouping);
  }

  private getInitialGrouping() {
    return (
      this.localStorageService.get<GanttGrouping>(LS_GANTT_TOOLBAR_GROUPING) ||
      'tasks'
    );
  }
}
