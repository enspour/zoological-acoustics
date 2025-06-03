import { Injector, Type } from '@angular/core';

export interface ExplorerConfig<T> {
  component: Type<T>;
  inputs?: Record<string, any>;
  injector?: Injector;
  minWidth?: number;
  maxWidth?: number;
}

export interface ExplorerRef<T> {
  id?: string;
  config: ExplorerConfig<T>;
  close: () => void;
}
