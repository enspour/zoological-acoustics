import { Directive, ElementRef, inject } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Directive()
export class KuduWorkspaceEventsDirective {
  private elementRef = inject(ElementRef);

  public mouseup$!: Observable<MouseEvent>;
  public mousedown$!: Observable<MouseEvent>;
  public mouseleave$!: Observable<MouseEvent>;
  public mousemove$!: Observable<MouseEvent>;
  public mousewheel$!: Observable<WheelEvent>;

  constructor() {
    const element = this.elementRef.nativeElement;

    this.mouseup$ = fromEvent<MouseEvent>(element, 'mouseup');
    this.mousedown$ = fromEvent<MouseEvent>(element, 'mousedown');
    this.mouseleave$ = fromEvent<MouseEvent>(element, 'mouseleave');
    this.mousemove$ = fromEvent<MouseEvent>(element, 'mousemove');
    this.mousewheel$ = fromEvent<WheelEvent>(element, 'wheel', {
      passive: false,
    });
  }
}
