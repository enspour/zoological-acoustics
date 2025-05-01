import { Injector, TemplateRef, Type, ViewContainerRef } from '@angular/core';

export interface MkComponentTeleport<C = any> {
  type: 'component';
  component: Type<C>;
  inputs?: Record<string, any>;
  injector?: Injector;
  vcRef?: ViewContainerRef;
}

export interface MkTemplateTeleport<C = any> {
  type: 'template';
  template: TemplateRef<C>;
  context?: C;
  injector?: Injector;
  vcRef: ViewContainerRef;
}

export type MkTeleport<C = any> =
  | MkComponentTeleport<C>
  | MkTemplateTeleport<C>;
