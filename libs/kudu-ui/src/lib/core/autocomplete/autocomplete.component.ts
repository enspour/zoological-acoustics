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
  KuduOverlayComponent,
  KuduOverlayConfig,
  KuduOverlayOriginDirective,
  KuduOverlayPositionX,
  KuduOverlayPositionY,
} from '../overlay';

import { KuduClickOutsideZoneDirective } from '../click-outside';
import { KuduOptionsDirective } from '../options';
import { kuduSize } from '../size';

@Component({
  selector: 'kudu-autocomplete',
  imports: [FormsModule, KuduOverlayComponent, KuduOverlayOriginDirective],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    KuduClickOutsideZoneDirective,
    {
      directive: KuduOptionsDirective,
      inputs: ['value', 'multiple'],
      outputs: ['valueChange'],
    },
  ],
})
export class KuduAutocompleteComponent {
  private options = inject(KuduOptionsDirective);

  public size = inject(kuduSize);

  public isOpen = model(false);

  public text = model<string>('');

  public placeholder = input<string>('');

  public config: KuduOverlayConfig = {
    width: 'origin-width',
    positionX: 'right',
    positionY: 'under',
    lockX: true,
    lockY: false,
  };

  public positionX = signal<KuduOverlayPositionX>('right');
  public positionY = signal<KuduOverlayPositionY>('under');

  constructor() {
    effect(() => this.options.filterByText(this.text()));
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

  @HostListener('click')
  public onClick() {
    this.isOpen.set(true);
  }
}
