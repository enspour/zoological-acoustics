import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostBinding,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  KuduPopupComponent,
  KuduPopupConfig,
  KuduPopupPositionX,
  KuduPopupPositionY,
  KuduPopupTriggerDirective,
} from '../popup';

import { KuduOptionsDirective } from '../options';
import { kuduSize } from '../size';

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
      inputs: ['value', 'multiple'],
      outputs: ['valueChange'],
    },
  ],
})
export class KuduAutocompleteComponent {
  private optionsDirective = inject(KuduOptionsDirective);
  private trigger = inject(KuduPopupTriggerDirective);

  public size = inject(kuduSize);

  public isOpen = this.trigger.isOpen;

  public text = model<string>('');

  public placeholder = input<string>('');

  public config: KuduPopupConfig = {
    width: 'origin-width',
    lockX: true,
    lockY: false,
  };

  public positionX = signal<KuduPopupPositionX>('right');
  public positionY = signal<KuduPopupPositionY>('under');

  constructor() {
    effect(() => this.optionsDirective.filterByText(this.text()));
  }

  @HostBinding('class')
  public get Classes() {
    return `
      ${this.size()} 
      ${this.isOpen() ? 'opened' : 'closed'} 
      ${this.positionX()}
      ${this.positionY()}
    `;
  }
}
