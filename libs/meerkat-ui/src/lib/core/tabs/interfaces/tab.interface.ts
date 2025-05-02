import { Signal, TemplateRef } from '@angular/core';

export interface MkTab {
  explicitContent: Signal<TemplateRef<any> | undefined>;
  implicitContent: Signal<TemplateRef<any> | undefined>;
  isActive: Signal<boolean>;
  setIsActive(isActive: boolean): void;
}

export interface MkTabContent {
  template: TemplateRef<any>;
}
