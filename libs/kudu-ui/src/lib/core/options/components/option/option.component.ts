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

import { kuduSize } from '../../../size';

import { KuduOptionsDirective } from '../../directives/options.directive';

@Component({
  selector: 'kudu-option',
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduOptionComponent<T> {
  private options = inject(KuduOptionsDirective);

  private size = inject(kuduSize);

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
