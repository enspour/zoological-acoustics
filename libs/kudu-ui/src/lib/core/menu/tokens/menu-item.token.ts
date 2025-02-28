import { InjectionToken, OutputEmitterRef } from '@angular/core';

export interface KuduMenuItem {
  byClick: OutputEmitterRef<Event>;
}

export const kuduMenuItemToken = new InjectionToken<KuduMenuItem>(
  'kudu-ui/menu/item',
);
