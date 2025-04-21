import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import {
  KuduPopupComponent,
  KuduPopupConfig,
  KuduPopupPosition,
  KuduPopupTriggerDirective,
} from '../popup';

import { KuduOptionsDirective } from '../options';

import { kuduSize } from '../size';

@Component({
  selector: 'kudu-select',
  imports: [KuduPopupComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    KuduPopupTriggerDirective,
    {
      directive: KuduOptionsDirective,
      inputs: ['kuduOptionsValue: value'],
      outputs: ['kuduOptionsValueChange: valueChange'],
    },
  ],
})
export class KuduSelectComponent {
  private domSanitizer = inject(DomSanitizer);
  private trigger = inject(KuduPopupTriggerDirective);
  private options = inject(KuduOptionsDirective);

  public size = inject(kuduSize);

  public isOpen = this.trigger.isOpen;

  public placeholder = input<string>('');

  public config: KuduPopupConfig = {
    width: 'origin-width',
    position: 'under',
    lockX: true,
    lockY: false,
  };

  public position = signal<KuduPopupPosition>('under');

  public content = computed(() => this.getContent());

  @HostBinding('class')
  public get Classes() {
    return `
      ${this.size()} 
      ${this.isOpen() ? 'opened' : 'closed'} 
      ${this.position()}
    `;
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
