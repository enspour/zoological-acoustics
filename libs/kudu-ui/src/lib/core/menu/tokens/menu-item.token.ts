import { InjectionToken, OutputEmitterRef } from '@angular/core';

export interface KuduMenuItem {
  byClick: OutputEmitterRef<Event>;
}

export const kuduMenuItem = new InjectionToken<KuduMenuItem>(
  'kudu-ui/menu/item',
);
