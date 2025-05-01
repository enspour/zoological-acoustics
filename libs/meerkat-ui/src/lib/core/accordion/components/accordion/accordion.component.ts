import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { mkSize } from '../../../size';

import { MkAccordionItemComponent } from '../accordion-item/accordion-item.component';

@Component({
  selector: 'mk-accordion',
  standalone: true,
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkAccordionComponent {
  private size = inject(mkSize);

  private items = contentChildren(MkAccordionItemComponent);

  public multiple = input<boolean>(false);

  private opened = computed(() => this.items().filter((item) => item.isOpen()));

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }

  public toggle(item: MkAccordionItemComponent) {
    if (!this.multiple()) {
      this.opened().forEach((opened) => opened !== item && opened.close());
    }

    item.toggle();
  }
}
