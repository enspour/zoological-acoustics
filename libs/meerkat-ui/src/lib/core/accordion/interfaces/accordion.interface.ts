import { MkAccordionItem } from './accordion-item.interface';

export interface MkAccordion {
  toggle(item: MkAccordionItem): void;
}
