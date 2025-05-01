import { Directive, ElementRef, inject } from '@angular/core';

export type MkElementRef<T> = ElementRef<T extends any ? HTMLElement : T>;

@Directive({
  selector: '[mkElementRef]',
  exportAs: 'mkElementRef',
})
export class MkElementRefDirective<T extends Element = HTMLElement>
  implements MkElementRef<T>
{
  private elementRef = inject<MkElementRef<T>>(ElementRef);

  public get nativeElement() {
    return this.elementRef.nativeElement;
  }
}
