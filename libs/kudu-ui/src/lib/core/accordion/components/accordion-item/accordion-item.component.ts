import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  HostBinding,
  inject,
  model,
  output,
  TemplateRef,
} from '@angular/core';

import { kuduSize } from '../../../size';

import { KuduExpandedComponent } from '../../../expanded/expanded.component';

import { kuduAccordionItemContent } from '../../directives/accordion-item-content.directive';
import { KuduAccordionComponent } from '../accordion/accordion.component';

@Component({
  selector: 'kudu-accordion-item',
  standalone: true,
  imports: [NgTemplateOutlet, KuduExpandedComponent],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduAccordionItemComponent {
  private accordion = inject(KuduAccordionComponent);
  private size = inject(kuduSize);

  public content = contentChild(kuduAccordionItemContent, {
    read: TemplateRef,
  });

  public isOpen = model(false);

  public byClick = output<Event>();

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }

  public onClick(event: Event) {
    this.accordion.toggle(this);
    this.byClick.emit(event);
  }

  public open() {
    this.isOpen.set(true);
  }

  public close() {
    this.isOpen.set(false);
  }

  public toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }
}
