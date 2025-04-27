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
  KuduPopupComponent,
  KuduPopupConfig,
  KuduPopupPosition,
  KuduPopupTriggerDirective,
} from '../popup';

import { kuduSize } from '../size';

import { KuduOptionsDirective } from '../options';

@Component({
  selector: 'kudu-autocomplete',
  imports: [FormsModule, KuduPopupComponent],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    KuduPopupTriggerDirective,
    {
      directive: KuduOptionsDirective,
      inputs: ['kuduOptionsValue: value'],
      outputs: [
        'kuduOptionsValueChange: valueChange',
        'kuduOptionsByClick: byOptionClick',
      ],
    },
  ],
})
export class KuduAutocompleteComponent {
  private options = inject(KuduOptionsDirective);
  private trigger = inject(KuduPopupTriggerDirective);

  public size = inject(kuduSize);

  public isOpen = this.trigger.isOpen;

  public searchTerm = model<string>('');

  public placeholder = input<string>('');

  public config: KuduPopupConfig = {
    width: 'origin-width',
    position: 'under',
    lockX: true,
    lockY: false,
  };

  public position = signal<KuduPopupPosition>('under');

  constructor() {
    effect(() => this.search());
  }

  @HostBinding('class')
  public get Classes() {
    return `
      ${this.size()} 
      ${this.isOpen() ? 'opened' : 'closed'} 
      ${this.position()}
    `;
  }

  @HostListener('byOptionClick')
  public onOptionClick() {
    if (!Array.isArray(this.options.value)) {
      this.trigger.close();
    }
  }

  public search() {
    const searchTerm = this.searchTerm().toLowerCase();

    for (const option of this.options.options()) {
      const text = option.elementRef.nativeElement.innerText.toLowerCase();

      if (text.includes(searchTerm)) {
        option.isHidden.set(false);
      } else {
        option.isHidden.set(true);
      }
    }
  }
}
