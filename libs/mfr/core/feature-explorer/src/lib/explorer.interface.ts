import { Injector, Type } from '@angular/core';

export interface ExplorerConfig<T> {
  component: Type<T>;
  inputs?: Record<string, any>;
  injector?: Injector;
}
