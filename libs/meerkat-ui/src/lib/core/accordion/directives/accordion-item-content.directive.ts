import { Directive, inject, TemplateRef } from '@angular/core';

import { MkAccordionItemContent } from '../interfaces';

import { mkAccordionItemContent } from '../tokens';

@Directive({
  selector: '[mkAccordionItemContent]',
  providers: [
    {
      provide: mkAccordionItemContent,
      useExisting: MkAccordionItemContentDirective,
    },
  ],
})
export class MkAccordionItemContentDirective implements MkAccordionItemContent {
  public template = inject(TemplateRef, { optional: true });
}
