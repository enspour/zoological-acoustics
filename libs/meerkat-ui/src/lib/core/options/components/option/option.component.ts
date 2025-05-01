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

import { MkOptionsDirective } from '../../directives/options.directive';

@Component({
  selector: 'mk-option',
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkOptionComponent<T> {
  private options = inject(MkOptionsDirective);

  private size = inject(mkSize);

  public value = input.required<T>();

  public disabled = input(false);

  public isHidden = signal(false);
  public isSelected = computed(() => this.getIsSelected());

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

  private getIsSelected() {
    return this.options.isSelected(this.value());
  }
}
