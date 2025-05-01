import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, Subject, takeUntil } from 'rxjs';

import { MkFlowWorkspaceDirective } from './workspace.directive';

import { Point } from '../../../interfaces';

import { getWheelDirection } from '../../../utils';

@Directive()
export class MkFlowWorkspaceInteractionDirective implements OnDestroy {
  private elementRef = inject(ElementRef);
  private workspace = inject(MkFlowWorkspaceDirective);

  public isInteracting = signal(false);

  public mouseup$;
  public mousedown$;
  public mouseleave$;
  public mousemove$;
  public mousewheel$;

  private destroy$ = new Subject<void>();

  constructor() {
    const element = this.elementRef.nativeElement;

    this.mouseup$ = fromEvent<MouseEvent>(element, 'mouseup');
    this.mousedown$ = fromEvent<MouseEvent>(element, 'mousedown');
    this.mouseleave$ = fromEvent<MouseEvent>(element, 'mouseleave');
    this.mousemove$ = fromEvent<MouseEvent>(element, 'mousemove');
    this.mousewheel$ = fromEvent<WheelEvent>(element, 'wheel', {
      passive: false,
    });

    this.mousedown$
      .pipe(takeUntilDestroyed())
      .subscribe((event) => this.handleMouseDown(event));

    this.mousewheel$
      .pipe(takeUntilDestroyed())
      .subscribe((event) => this.handleWheel(event));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleMouseDown(event: MouseEvent) {
    const isLeftMouse = event.button === 0;

    /**
     * TODO (FIX): not correct detection when click on workspace
     *             and when click on element in workspace to scrolling
     */
    const isWorkspace = this.elementRef.nativeElement === event.target;

    if (this.isInteracting() || !isLeftMouse || !isWorkspace) {
      return;
    }

    this.isInteracting.set(true);

    const point = {
      x: event.clientX,
      y: event.clientY,
    };

    this.mousemove$
      .pipe(takeUntil(this.destroy$))
      .subscribe((event) => this.handleMouseMove(event, point));

    this.mouseup$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.handleMouseUp());

    this.mouseleave$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.handleMouseUp());
  }

  handleMouseUp() {
    this.isInteracting.set(false);
    this.destroy$.next();
  }

  handleMouseMove(event: MouseEvent, prevPoint: Point) {
    if (!this.isInteracting) {
      return;
    }

    const point = {
      x: event.clientX,
      y: event.clientY,
    };

    const diffX = point.x - prevPoint.x;
    const diffY = point.y - prevPoint.y;

    prevPoint.x = point.x;
    prevPoint.y = point.y;

    this.workspace.setScroll({
      x: this.workspace.scroll().x + diffX,
      y: this.workspace.scroll().y + diffY,
    });
  }

  handleWheel(event: WheelEvent) {
    event.preventDefault();

    if (event.ctrlKey) {
      return this.onScaling(event);
    }

    if (event.shiftKey) {
      return this.onHorizontalScroll(event);
    }

    return this.onVerticalScroll(event);
  }

  private onScaling(event: WheelEvent) {
    const layout = this.workspace.layout();

    if (!layout) {
      return;
    }

    const direction = getWheelDirection(event);

    if (direction === 'forward') {
      this.workspace.scaleIn({
        x: event.clientX - layout.left,
        y: event.clientY - layout.top,
      });
    } else {
      this.workspace.scaleOut({
        x: event.clientX - layout.left,
        y: event.clientY - layout.top,
      });
    }
  }

  private onHorizontalScroll(event: WheelEvent) {
    const direction = getWheelDirection(event);

    if (direction === 'forward') {
      this.workspace.scrollLeft();
    } else {
      this.workspace.scrollRight();
    }
  }

  private onVerticalScroll(event: WheelEvent) {
    const direction = getWheelDirection(event);

    if (direction === 'forward') {
      this.workspace.scrollUp();
    } else {
      this.workspace.scrollDown();
    }
  }
}
