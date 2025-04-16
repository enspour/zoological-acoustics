import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import {
  KuduPopupComponent,
  KuduPopupConfig,
  KuduPopupPositionX,
  KuduPopupPositionY,
  KuduPopupTriggerDirective,
} from '../popup';

import { KuduOptionComponent, KuduOptionsDirective } from '../options';
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
      inputs: ['value', 'multiple'],
      outputs: ['valueChange', 'bySelectionChange'],
    },
  ],
})
export class KuduSelectComponent<T> implements OnInit {
  private domSanitizer = inject(DomSanitizer);
  private trigger = inject(KuduPopupTriggerDirective);

  public size = inject(kuduSize);

  public isOpen = this.trigger.isOpen;

  public placeholder = input<string>('');

  public config: KuduPopupConfig = {
    width: 'origin-width',
    lockX: true,
    lockY: false,
  };

  public positionX = signal<KuduPopupPositionX>('right');
  public positionY = signal<KuduPopupPositionY>('under');

  public content = signal<SafeHtml>('');

  @HostBinding('class')
  public get Classes() {
    return `
      ${this.size()} 
      ${this.isOpen() ? 'opened' : 'closed'} 
      ${this.positionX()}
      ${this.positionY()}
    `;
  }

  ngOnInit(): void {
    this.setContentToPlaceholder();
  }

  @HostListener('bySelectionChange', ['$event'])
  public onOptionChange(selection: KuduOptionComponent<T>[]) {
    if (selection.length === 0) {
      return this.setContentToPlaceholder();
    }

    if (selection.length === 1) {
      return this.setContentToSelected(selection[0]);
    }

    this.content.set(`Выбрано: ${selection.length}`);
  }

  private setContentToPlaceholder() {
    const content = this.placeholder();
    this.content.set(this.domSanitizer.bypassSecurityTrustHtml(content));
  }

  private setContentToSelected(selected: KuduOptionComponent<T>) {
    const content = selected.elementRef.nativeElement.innerHTML;
    return this.content.set(this.domSanitizer.bypassSecurityTrustHtml(content));
  }
}
