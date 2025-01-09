import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  inject,
  InjectionToken,
  input,
  model,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { KuduClickOutsideDirective } from '../click-outside';

import { KuduDropdownComponent, KuduDropdownPosition } from '../dropdown';
import { KuduOptionComponent, KuduOptionsDirective } from '../options';
import { kuduSize } from '../size';
import { KuduZoneDirective } from '../zone';

export interface KuduSelect {}

export const KuduSelect = new InjectionToken<KuduSelect>('kudu-ui/select');

@Component({
  selector: 'kudu-select',
  imports: [KuduDropdownComponent],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: KuduSelect, useExisting: KuduSelectComponent }],
  hostDirectives: [
    {
      directive: KuduClickOutsideDirective,
      outputs: ['byClickOutside'],
    },
    {
      directive: KuduOptionsDirective,
      inputs: ['value', 'multiple'],
      outputs: ['valueChange', 'byOptionClick', 'bySelectedChange'],
    },
    { directive: KuduZoneDirective },
  ],
})
export class KuduSelectComponent implements KuduSelect {
  private domSanitizer = inject(DomSanitizer);
  private size = inject(kuduSize);

  public isOpen = model(false);

  public placeholder = input<string>('');

  public optionsPosition = model<KuduDropdownPosition>('top');

  public content = signal<SafeHtml>('');

  @HostBinding('class')
  public get Classes() {
    return `${this.size()} ${this.isOpen() ? 'opened' : ''} ${this.optionsPosition()}`;
  }

  @HostListener('byClickOutside')
  public onClickOutside() {
    this.isOpen.set(false);
  }

  @HostListener('bySelectedChange', ['$event'])
  public onOptionChange(selected: KuduOptionComponent<any>[]) {
    if (selected.length === 0) {
      return this.content.set('');
    }

    if (selected.length === 1) {
      const content = selected[0].elementRef.nativeElement.innerHTML;
      return this.content.set(
        this.domSanitizer.bypassSecurityTrustHtml(content),
      );
    }

    this.content.set(`Выбрано: ${selected.length}`);
  }

  public onClick() {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
