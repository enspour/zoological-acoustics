import { inject, Injectable, signal } from '@angular/core';

import { clamp } from '@kudu-utils';

import { LocalStorageService } from '@kudu/mfr-util-local-storage';

const LS_GANTT_SIDEBAR_WIDTH = '__v1/gantt/sidebar/width';

const SIDEBAR_MAX_WIDTH = 550;
const SIDEBAR_MIN_WIDTH = 150;

@Injectable()
export class GanttSidebarService {
  private localStorageService = inject(LocalStorageService);

  private _width = signal(this.getInitialWidth());
  public width = this._width.asReadonly();

  public setWidth(width: number) {
    width = clamp(width, SIDEBAR_MIN_WIDTH, SIDEBAR_MAX_WIDTH);

    this._width.set(width);
    this.localStorageService.set(LS_GANTT_SIDEBAR_WIDTH, width);
  }

  private getInitialWidth() {
    return this.localStorageService.get<number>(LS_GANTT_SIDEBAR_WIDTH) || 550;
  }
}
