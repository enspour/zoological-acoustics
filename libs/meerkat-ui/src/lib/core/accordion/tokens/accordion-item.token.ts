import { InjectionToken } from '@angular/core';

import { MkAccordionItem, MkAccordionItemContent } from '../interfaces';

export const mkAccordionItem = new InjectionToken<MkAccordionItem>(
  'mk-ui/accordion-item',
);

export const mkAccordionItemContent =
  new InjectionToken<MkAccordionItemContent>('mk-ui/accordion-item/content');
