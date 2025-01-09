import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  Inject,
  model,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { KuduFlowWorkspaceService } from './services';

import { KuduFlowWorkspaceEventsDirective } from './directives';

import { Point } from '../../interfaces';
import { KuduFlowWorkspaceScale, KuduFlowWorkspaceScroll } from './interfaces';

import { getWheelDirection } from './utils';

@Component({
  selector: 'kudu-flow-workspace',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
  providers: [KuduFlowWorkspaceService],
  hostDirectives: [KuduFlowWorkspaceEventsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduFlowWorkspaceComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private scalableRef = viewChild<ElementRef<HTMLDivElement>>('scalable');

  public scroll = model<KuduFlowWorkspaceScroll>({ x: 0, y: 0 });
  public scale = model<KuduFlowWorkspaceScale>(1);

  protected isMoving = signal(false);

  private isPressSpace = false;

  private cleaner$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef<HTMLElement>,
    private workspaceService: KuduFlowWorkspaceService,
    private workspaceEventsDirective: KuduFlowWorkspaceEventsDirective,
  ) {
    effect(() => this.workspaceService.setScroll(this.scroll()));
    effect(() => this.workspaceService.setScale(this.scale()));
    effect(() => this.scroll.set(this.workspaceService.scroll()));
    effect(() => this.scale.set(this.workspaceService.scale()));
  }

  ngOnInit(): void {
    const { left, top } = this.elementRef.nativeElement.getBoundingClientRect();
    this.workspaceService.setOffset({ left, top });

    this.workspaceEventsDirective.mousedown$
      .pipe(takeUntil(this.destroy$))
      .subscribe((event) => this.handleMouseDown(event));

    this.workspaceEventsDirective.mousewheel$
      .pipe(takeUntil(this.destroy$))
      .subscribe((event) => this.handleWheel(event));

    this.workspaceEventsDirective.space$
      .pipe(takeUntil(this.destroy$))
      .subscribe((space) => this.handleSpacePressed(space.isPress));
  }

  ngOnDestroy(): void {
    this.cleaner$.next();
    this.cleaner$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.workspaceService.setScalableRef(this.scalableRef()!);
  }

  handleSpacePressed(isPress: boolean) {
    if (this.isPressSpace === isPress) {
      return;
    }

    this.isPressSpace = isPress;

    if (this.isPressSpace) {
      this.document.body.style.cursor = 'grab';
    } else {
      this.document.body.style.cursor = 'auto';
    }
  }

  handleMouseDown(event: MouseEvent) {
    if (
      this.isMoving() ||
      !(event.button === 1 || (event.button === 0 && this.isPressSpace))
    ) {
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
      .subscribe((event) => this.handleMouseUp(event));

    this.workspaceEventsDirective.mouseleave$
      .pipe(takeUntil(this.cleaner$))
      .subscribe((event) => this.handleMouseUp(event));
  }

  handleMouseUp(event: MouseEvent) {
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

    this.workspaceService.setScroll({
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
    const direction = getWheelDirection(event);

    if (direction === 'forward') {
      this.workspaceService.scaleIn({
        x: event.clientX - this.workspaceService.offset().left,
        y: event.clientY - this.workspaceService.offset().top,
      });
    } else {
      this.workspaceService.scaleOut({
        x: event.clientX - this.workspaceService.offset().left,
        y: event.clientY - this.workspaceService.offset().top,
      });
    }
  }

  private onHorizontalScroll(event: WheelEvent) {
    const direction = getWheelDirection(event);

    if (direction === 'forward') {
      this.workspaceService.scrollLeft();
    } else {
      this.workspaceService.scrollRight();
    }
  }

  private onVerticalScroll(event: WheelEvent) {
    const direction = getWheelDirection(event);

    if (direction === 'forward') {
      this.workspaceService.scrollUp();
    } else {
      this.workspaceService.scrollDown();
    }
  }
}
