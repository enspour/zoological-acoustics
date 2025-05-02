import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { mkSize } from '../../../size';

import { MkAccordion, MkAccordionItem } from '../../interfaces';

import { mkAccordion, mkAccordionItem } from '../../tokens';

@Component({
  selector: 'mk-accordion',
  standalone: true,
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: mkAccordion, useExisting: MkAccordionComponent }],
})
export class MkAccordionComponent implements MkAccordion {
  private size = inject(mkSize);

  private items = contentChildren(mkAccordionItem);

  public multiple = input<boolean>(false);

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }

  public toggle(item: MkAccordionItem) {
    if (!this.multiple()) {
      this.items().forEach((item) => item.close());
    }

    item.toggle();
  }
}
