import { Directive, ElementRef, inject } from '@angular/core';

export type KuduElementRef<T> = ElementRef<T extends any ? HTMLElement : T>;

@Directive({
  selector: '[kuduElementRef]',
  exportAs: 'kuduElementRef',
})
export class KuduElementRefDirective<T extends Element = HTMLElement>
  implements KuduElementRef<T>
{
  private elementRef = inject<KuduElementRef<T>>(ElementRef);

  public get nativeElement() {
    return this.elementRef.nativeElement;
  }
}
