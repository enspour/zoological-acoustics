import { Signal } from '@angular/core';

import { MkTab } from './tab.interface';

export type MkTabsOrientation = 'vertical' | 'horizontal';

export interface MkTabs {
  currentTab: Signal<MkTab>;
  currentIndex: Signal<number>;
  orientation: Signal<MkTabsOrientation>;
  open(tab: MkTab): void;
}
