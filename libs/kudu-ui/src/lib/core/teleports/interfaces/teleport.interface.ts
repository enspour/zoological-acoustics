import { Injector, TemplateRef, Type } from '@angular/core';

export interface KuduTeleportByTemplate {
  placeId: string;
  type: 'template';
  template: TemplateRef<any>;
}

export interface KuduTeleportByComponent {
  placeId: string;
  type: 'component';
  component: Type<any>;
  inputs?: Record<string, any>;
  injector?: Injector;
}

export type KuduTeleport = KuduTeleportByTemplate | KuduTeleportByComponent;
