import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  HostBinding,
  inject,
  input,
} from '@angular/core';

import { kuduSize } from '../../../size';

import { KuduAccordionItemComponent } from '../accordion-item/accordion-item.component';

@Component({
  selector: 'kudu-accordion',
  standalone: true,
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduAccordionComponent {
  private size = inject(kuduSize);

  private items = contentChildren(KuduAccordionItemComponent);

  public multiple = input<boolean>(false);

  private opened = computed(() => this.items().filter((item) => item.isOpen()));

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }

  public toggle(item: KuduAccordionItemComponent) {
    if (!this.multiple()) {
      this.opened().forEach((opened) => opened !== item && opened.close());
    }

    item.toggle();
  }
}
