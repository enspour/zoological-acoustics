import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[kuduAutofocus]',
})
export class KuduAutofocusDirective implements OnInit {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public autofocus = input(true);

  ngOnInit(): void {
    if (this.autofocus()) {
      setTimeout(() => this.elementRef.nativeElement.focus());
    }
  }
}
