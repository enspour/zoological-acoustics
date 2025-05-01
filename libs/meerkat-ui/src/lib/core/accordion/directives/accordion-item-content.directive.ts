import { Directive, inject, InjectionToken, TemplateRef } from '@angular/core';

export const mkAccordionItemContent = new InjectionToken(
  'mk-ui/accordion-item/content',
);

@Directive({
  selector: '[mkAccordionItemContent]',
  providers: [
    {
      provide: mkAccordionItemContent,
      useExisting: MkAccordionItemContentDirective,
    },
  ],
})
export class MkAccordionItemContentDirective {
  public template = inject<TemplateRef<unknown> | undefined>(TemplateRef, {
    optional: true,
  });
}
