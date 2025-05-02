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

import { mkSize } from '../../../size';

import { MkExpandedComponent } from '../../../expanded/expanded.component';

import { MkAccordionItem } from '../../interfaces';

import {
  mkAccordion,
  mkAccordionItem,
  mkAccordionItemContent,
} from '../../tokens';

@Component({
  selector: 'mk-accordion-item',
  standalone: true,
  imports: [NgTemplateOutlet, MkExpandedComponent],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: mkAccordionItem, useExisting: MkAccordionItemComponent },
  ],
})
export class MkAccordionItemComponent implements MkAccordionItem {
  private size = inject(mkSize);
  private accordion = inject(mkAccordion);

  public content = contentChild(mkAccordionItemContent, {
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
