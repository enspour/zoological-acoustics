import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { mkSize } from '../../../size';

import { MkOption } from '../../interfaces';

import { mkOption, mkOptions } from '../../tokens';

@Component({
  selector: 'mk-option',
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: mkOption, useExisting: MkOptionComponent }],
})
export class MkOptionComponent<V> implements MkOption<V> {
  private options = inject(mkOptions);

  private size = inject(mkSize);

  public value = input.required<V>();

  public disabled = input(false);

  public isHidden = signal(false);
  public isSelected = computed(() => this.options.isSelected(this.value()));

  public byClick = output<Event>();

  constructor(public elementRef: ElementRef<HTMLElement>) {}

  @HostBinding('class')
  public get Classes() {
    return `
      ${this.size()} 
      ${this.isHidden() ? 'hidden' : ''} 
      ${this.isSelected() ? 'selected' : ''} 
      ${this.disabled() ? 'disabled' : ''}
    `;
  }

  @HostListener('click', ['$event'])
  public onClick(event: Event) {
    this.options.toggle(this.value());
    this.byClick.emit(event);
  }

  public setIsHidden(isHidden: boolean) {
    this.isHidden.set(isHidden);
  }
}
