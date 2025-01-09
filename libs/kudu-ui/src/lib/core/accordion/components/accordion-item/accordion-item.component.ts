import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  HostBinding,
  inject,
  linkedSignal,
  model,
  output,
  TemplateRef,
} from '@angular/core';

import { kuduSize } from '../../../size';
import { kuduAccordionItemContent } from '../../directives/accordion-item-content.directive';

export type AccordionStatus = 'idle' | 'animated';

@Component({
  selector: 'kudu-accordion-item',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduAccordionItemComponent {
  public size = inject(kuduSize);

  public content = contentChild(kuduAccordionItemContent, {
    read: TemplateRef,
  });

  public isOpen = model(false);

  public status = linkedSignal<boolean, AccordionStatus>({
    source: this.isOpen,
    computation: (_, previous) => (previous ? 'animated' : 'idle'),
  });

  public byClick = output<Event>();

  @HostBinding('class')
  public get Classes() {
    return `${this.size()}`;
  }

  public onClick(event: Event) {
    this.byClick.emit(event);
  }

  public onTransitionEnd() {
    this.status.set('idle');
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
