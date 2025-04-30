import { Injector, TemplateRef, Type, ViewContainerRef } from '@angular/core';

export interface KuduComponentTeleport<C = any> {
  type: 'component';
  component: Type<C>;
  inputs?: Record<string, any>;
  injector?: Injector;
  vcRef?: ViewContainerRef;
}

export interface KuduTemplateTeleport<C = any> {
  type: 'template';
  template: TemplateRef<C>;
  context?: C;
  injector?: Injector;
  vcRef: ViewContainerRef;
}

export type KuduTeleport<C = any> =
  | KuduComponentTeleport<C>
  | KuduTemplateTeleport<C>;
