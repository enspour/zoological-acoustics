import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  inject,
  input,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import {
  KuduOverlayComponent,
  KuduOverlayConfig,
  KuduOverlayOriginDirective,
  KuduOverlayPositionX,
  KuduOverlayPositionY,
} from '../overlay';

import { KuduClickOutsideZoneDirective } from '../click-outside';
import { KuduOptionComponent, KuduOptionsDirective } from '../options';
import { kuduSize } from '../size';

@Component({
  selector: 'kudu-select',
  imports: [KuduOverlayComponent, KuduOverlayOriginDirective],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    KuduClickOutsideZoneDirective,
    {
      directive: KuduOptionsDirective,
      inputs: ['value', 'multiple'],
      outputs: ['valueChange', 'bySelectionChange'],
    },
  ],
})
export class KuduSelectComponent<T> implements OnInit {
  private domSanitizer = inject(DomSanitizer);

  public size = inject(kuduSize);

  public isOpen = model(false);

  public placeholder = input<string>('');

  public config: KuduOverlayConfig = {
    width: 'origin-width',
    positionX: 'left',
    positionY: 'under',
    lockX: true,
    lockY: false,
    gap: 0,
  };

  public positionX = signal<KuduOverlayPositionX>('right');
  public positionY = signal<KuduOverlayPositionY>('under');

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

  public onClick() {
    this.isOpen.update((isOpen) => !isOpen);
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
