import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';

import {
  KuduWorkspaceDirective,
  KuduWorkspaceEventsDirective,
} from './directives';

import { Point } from '../../interfaces';

import { getWheelDirection } from './utils';

@Component({
  selector: 'kudu-flow-workspace',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
  hostDirectives: [
    { directive: KuduWorkspaceDirective, inputs: ['scroll', 'scale'] },
    KuduWorkspaceEventsDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduWorkspaceComponent implements OnDestroy {
  private document = inject(DOCUMENT);

  private workspaceDirective = inject(KuduWorkspaceDirective);
  private workspaceEventsDirective = inject(KuduWorkspaceEventsDirective);

  protected scroll = this.workspaceDirective.scroll;
  protected scale = this.workspaceDirective.scale;

  protected isMoving = signal(false);

  private isPressSpace = false;

  private cleaner$ = new Subject<void>();

  constructor() {
    this.workspaceEventsDirective.mousedown$
      .pipe(takeUntilDestroyed())
      .subscribe((event) => this.handleMouseDown(event));

    this.workspaceEventsDirective.mousewheel$
      .pipe(takeUntilDestroyed())
      .subscribe((event) => this.handleWheel(event));
  }

  ngOnDestroy(): void {
    this.cleaner$.next();
    this.cleaner$.complete();
  }

  handleMouseDown(event: MouseEvent) {
    if (this.isMoving() || event.button !== 0) {
      return;
    }

    this.isMoving.set(true);

    this.document.body.style.cursor = 'grabbing';

    const point = {
      x: event.clientX,
      y: event.clientY,
    };

    this.workspaceEventsDirective.mousemove$
      .pipe(takeUntil(this.cleaner$))
      .subscribe((event) => this.handleMouseMove(event, point));

    this.workspaceEventsDirective.mouseup$
      .pipe(takeUntil(this.cleaner$))
      .subscribe(() => this.handleMouseUp());

    this.workspaceEventsDirective.mouseleave$
      .pipe(takeUntil(this.cleaner$))
      .subscribe(() => this.handleMouseUp());
  }

  handleMouseUp() {
    this.isMoving.set(false);

    if (!this.isPressSpace) {
      this.document.body.style.cursor = 'auto';
    } else {
      this.document.body.style.cursor = 'grab';
    }

    this.cleaner$.next();
  }

  handleMouseMove(event: MouseEvent, prevPoint: Point) {
    if (!this.isMoving) {
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

    this.workspaceDirective.setScroll({
      x: this.scroll().x + diffX,
      y: this.scroll().y + diffY,
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
    const layout = this.workspaceDirective.layout();

    if (!layout) {
      return;
    }

    const direction = getWheelDirection(event);

    if (direction === 'forward') {
      this.workspaceDirective.scaleIn({
        x: event.clientX - layout.left,
        y: event.clientY - layout.top,
      });
    } else {
      this.workspaceDirective.scaleOut({
        x: event.clientX - layout.left,
        y: event.clientY - layout.top,
      });
    }
  }

  private onHorizontalScroll(event: WheelEvent) {
    const direction = getWheelDirection(event);

    if (direction === 'forward') {
      this.workspaceDirective.scrollLeft();
    } else {
      this.workspaceDirective.scrollRight();
    }
  }

  private onVerticalScroll(event: WheelEvent) {
    const direction = getWheelDirection(event);

    if (direction === 'forward') {
      this.workspaceDirective.scrollUp();
    } else {
      this.workspaceDirective.scrollDown();
    }
  }
}
