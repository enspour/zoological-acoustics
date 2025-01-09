import { Directive, inject, InjectionToken, TemplateRef } from '@angular/core';

export const kuduAccordionItemContent = new InjectionToken(
  'kudu-ui/accordion-item/content',
);

@Directive({
  selector: '[kuduAccordionItemContent]',
  providers: [
    {
      provide: kuduAccordionItemContent,
      useExisting: KuduAccordionItemContentDirective,
    },
  ],
})
export class KuduAccordionItemContentDirective {
  public template = inject<TemplateRef<any> | undefined>(TemplateRef, {
    optional: true,
  });
}
