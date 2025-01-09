import { Directive, inject, InjectionToken, TemplateRef } from '@angular/core';

export const kuduTabContent = new InjectionToken<KuduTabContentDirective>(
  'kudu-ui/tab-content',
);

@Directive({
  selector: '[kuduTabContent]',
  providers: [
    { provide: kuduTabContent, useExisting: KuduTabContentDirective },
  ],
})
export class KuduTabContentDirective {
  public template = inject<TemplateRef<any>>(TemplateRef);
}
