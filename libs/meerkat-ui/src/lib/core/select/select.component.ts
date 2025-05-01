import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {
  MkPopupComponent,
  MkPopupConfig,
  MkPopupPlacement,
  MkPopupTriggerDirective,
} from '../popup';

import { MkOptionsDirective } from '../options';

import { mkSize } from '../size';

@Component({
  selector: 'mk-select',
  imports: [MkPopupComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    MkPopupTriggerDirective,
    {
      directive: MkOptionsDirective,
      inputs: ['mkOptionsValue: value'],
      outputs: [
        'mkOptionsValueChange: valueChange',
        'mkOptionsByClick: byOptionClick',
      ],
    },
  ],
})
export class MkSelectComponent {
  private domSanitizer = inject(DomSanitizer);
  private trigger = inject(MkPopupTriggerDirective);
  private options = inject(MkOptionsDirective);

  public size = inject(mkSize);

  public isOpen = this.trigger.isOpen;

  public placeholder = input<string>('');

  public config: MkPopupConfig = {
    width: 'origin-width',
    placement: 'bottom',
    lockX: true,
    lockY: false,
  };

  public placement = signal<MkPopupPlacement>('bottom');

  public content = computed(() => this.getContent());

  @HostBinding('class')
  public get Classes() {
    return `
      ${this.size()} 
      ${this.isOpen() ? 'opened' : 'closed'} 
      ${this.placement()}
    `;
  }

  @HostListener('byOptionClick')
  public onOptionClick() {
    if (!Array.isArray(this.options.value())) {
      this.trigger.close();
    }
  }

  private getContent() {
    const selected = this.options
      .options()
      .filter((option) => option.isSelected());

    if (selected.length === 0) {
      const content = this.placeholder();
      return this.domSanitizer.bypassSecurityTrustHtml(content);
    }

    if (selected.length === 1) {
      const content = selected[0].elementRef.nativeElement.innerHTML;
      return this.domSanitizer.bypassSecurityTrustHtml(content);
    }

    return `Выбрано: ${selected.length}`;
  }
}
