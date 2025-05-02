import { Directive, inject, TemplateRef } from '@angular/core';

import { MkTabContent } from '../interfaces';

import { mkTabContent } from '../tokens';

@Directive({
  selector: '[mkTabContent]',
  providers: [{ provide: mkTabContent, useExisting: MkTabContentDirective }],
})
export class MkTabContentDirective implements MkTabContent {
  public template = inject(TemplateRef);
}
