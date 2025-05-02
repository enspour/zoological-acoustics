import { Signal, TemplateRef } from '@angular/core';

export interface MkAccordionItem {
  isOpen: Signal<boolean>;
  open(): void;
  close(): void;
  toggle(): void;
}

export interface MkAccordionItemContent {
  template: TemplateRef<any> | null;
}
