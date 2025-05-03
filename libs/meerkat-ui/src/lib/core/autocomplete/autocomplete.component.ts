import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostBinding,
  HostListener,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MkPopupComponent,
  MkPopupConfig,
  MkPopupPlacement,
  MkPopupTriggerDirective,
} from '../popup';

import { mkSize } from '../size';

import { MkOptionsDirective } from '../options';

@Component({
  selector: 'mk-autocomplete',
  imports: [FormsModule, MkPopupComponent],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
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
export class MkAutocompleteComponent {
  private options = inject(MkOptionsDirective);
  private trigger = inject(MkPopupTriggerDirective);

  public size = inject(mkSize);

  public isOpen = this.trigger.isOpen;

  public searchTerm = model<string>('');

  public placeholder = input<string>('');

  public config: MkPopupConfig = {
    width: 'origin-width',
    placement: 'bottom',
    lockX: true,
    lockY: false,
  };

  public placement = signal<MkPopupPlacement>('bottom');

  constructor() {
    effect(() => this.search());
  }

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

  public search() {
    const searchTerm = this.searchTerm().toLowerCase();

    for (const option of this.options.options()) {
      const text = option.elementRef.nativeElement.innerText.toLowerCase();

      if (text.includes(searchTerm)) {
        option.setIsHidden(false);
      } else {
        option.setIsHidden(true);
      }
    }
  }
}
