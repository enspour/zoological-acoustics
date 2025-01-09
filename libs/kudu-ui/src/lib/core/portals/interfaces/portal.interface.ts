import { Injector, TemplateRef, Type } from '@angular/core';

export interface KuduPortalByTemplate {
  id: string;
  type: 'template';
  template: TemplateRef<any>;
}

export interface KuduPortalByComponent {
  id: string;
  type: 'component';
  component: Type<any>;
  inputs?: Record<string, any>;
  injector?: Injector;
}

export type KuduPortal = KuduPortalByTemplate | KuduPortalByComponent;
