import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  HostBinding,
  inject,
  InjectionToken,
  input,
} from '@angular/core';

import { kuduSize } from '../../../size';
import { KuduAccordionItemComponent } from '../accordion-item/accordion-item.component';

export interface KuduAccordion {}

export const KuduAccordion = new InjectionToken<KuduAccordion>(
  'kudu-ui/accordion',
);

@Component({
  selector: 'kudu-accordion',
  standalone: true,
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: KuduAccordion, useExisting: KuduAccordionComponent }],
})
export class KuduAccordionComponent implements KuduAccordion, AfterContentInit {
  public size = inject(kuduSize);

  private items = contentChildren(KuduAccordionItemComponent);

  public multiple = input<boolean>(false);

  private opened = computed(() => this.items().filter((item) => item.isOpen()));

  ngAfterContentInit(): void {
    this.items().forEach((item) => {
      item.byClick.subscribe(() => {
        if (!this.multiple()) {
          this.opened().forEach((opened) => opened !== item && opened.close());
        }

        item.toggle();
      });
    });
  }

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }
}
