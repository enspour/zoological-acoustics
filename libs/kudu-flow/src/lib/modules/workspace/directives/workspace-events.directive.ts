import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject } from '@angular/core';
import { filter, fromEvent, map, merge, Observable } from 'rxjs';

@Directive({})
export class KuduFlowWorkspaceEventsDirective {
  private document = inject(DOCUMENT);
  private elementRef = inject(ElementRef);

  public mouseup$!: Observable<MouseEvent>;
  public mousedown$!: Observable<MouseEvent>;
  public mouseleave$!: Observable<MouseEvent>;
  public mousemove$!: Observable<MouseEvent>;
  public mousewheel$!: Observable<WheelEvent>;

  public keydown$ = fromEvent<KeyboardEvent>(this.document, 'keydown');
  public keyup$ = fromEvent<KeyboardEvent>(this.document, 'keyup');

  private spaceDown$ = this.keydown$.pipe(
    filter((key) => key.code === 'Space'),
    map((event) => ({ isPress: true, event })),
  );

  private spaceUp$ = this.keyup$.pipe(
    filter((key) => key.code === 'Space'),
    map((event) => ({ isPress: false, event })),
  );

  public space$ = merge(this.spaceDown$, this.spaceUp$);

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
