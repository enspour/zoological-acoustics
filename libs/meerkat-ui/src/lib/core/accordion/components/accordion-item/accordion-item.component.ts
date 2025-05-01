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

import { mkAccordionItemContent } from '../../directives/accordion-item-content.directive';
import { MkAccordionComponent } from '../accordion/accordion.component';

@Component({
  selector: 'mk-accordion-item',
  standalone: true,
  imports: [NgTemplateOutlet, MkExpandedComponent],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkAccordionItemComponent {
  private accordion = inject(MkAccordionComponent);
  private size = inject(mkSize);

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
