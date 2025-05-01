import { Directive, inject, InjectionToken, TemplateRef } from '@angular/core';

export const mkTabContent = new InjectionToken<MkTabContentDirective>(
  'mk-ui/tab-content',
);

@Directive({
  selector: '[mkTabContent]',
  providers: [{ provide: mkTabContent, useExisting: MkTabContentDirective }],
})
export class MkTabContentDirective {
  public template = inject<TemplateRef<unknown>>(TemplateRef);
}
