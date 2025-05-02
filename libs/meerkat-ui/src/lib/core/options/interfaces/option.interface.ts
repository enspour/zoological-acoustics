import { ElementRef, Signal } from '@angular/core';

export interface MkOption<V> {
  elementRef: ElementRef<HTMLElement>;
  value: Signal<V>;
  disabled: Signal<boolean>;
  isSelected: Signal<boolean>;
  isHidden: Signal<boolean>;
  setIsHidden(isHidden: boolean): void;
}
