import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[mkAutofocus]',
})
export class MkAutofocusDirective {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public autofocus = input(true);

  constructor() {
    afterNextRender(() => {
      if (this.autofocus()) {
        this.elementRef.nativeElement.focus();
      }
    });
  }
}
