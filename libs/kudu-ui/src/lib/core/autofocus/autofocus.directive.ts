import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[kuduAutofocus]',
})
export class KuduAutofocusDirective {
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
