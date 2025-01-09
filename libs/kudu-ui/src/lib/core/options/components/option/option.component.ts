import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  model,
  output,
} from '@angular/core';

import { kuduSize } from '../../../size';

@Component({
  selector: 'kudu-option',
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduOptionComponent<T> {
  public size = inject(kuduSize);

  public value = input.required<T>();

  public isHidden = model(false);
  public isSelected = model(false);

  public disabled = model(false);

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
    this.byClick.emit(event);
  }
}
