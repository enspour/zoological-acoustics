import { Injectable, signal } from '@angular/core';

import { ExplorerConfig } from './explorer.interface';

@Injectable()
export class ExplorerService {
  private _isOpen = signal(false);
  public isOpen = this._isOpen.asReadonly();

  public config = signal<ExplorerConfig<any> | null>(null);

  private _width = signal(550);
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
  }
}
