import { inject, Injectable, signal } from '@angular/core';

import { LocalStorageService } from '@kudu/mfr-util-local-storage';

import { ExplorerConfig } from './explorer.interface';

const LS_EXPLORER_WIDTH = '__v1/explorer/width';

@Injectable()
export class ExplorerService {
  private localStorageService = inject(LocalStorageService);

  private _isOpen = signal(false);
  public isOpen = this._isOpen.asReadonly();

  public config = signal<ExplorerConfig<any> | null>(null);

  private _width = signal(this.getInitialWidth());
  public width = this._width.asReadonly();

  public open<T>(config: ExplorerConfig<T>) {
    this.config.set(config);
    this._isOpen.set(true);
  }

  public close() {
    this._isOpen.set(false);
    this.config.set(null);
  }

  public setWidth(width: number) {
    this._width.set(width);
    this.localStorageService.set(LS_EXPLORER_WIDTH, width);
  }

  private getInitialWidth() {
    return this.localStorageService.get<number>(LS_EXPLORER_WIDTH) || 550;
  }
}
