import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Inject,
  model,
  OnDestroy,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import {
  KuduFlowWorkspaceEventsDirective,
  KuduFlowWorkspaceService,
} from '../workspace';

import { Point, ResizeDirection } from '../../interfaces';
import { KuduFlowNode } from './interfaces';

import { tryResizeNode } from './utils';

@Component({
  selector: 'kudu-flow-node',

  imports: [],
  templateUrl: './node.component.html',
  styleUrl: './node.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KuduFlowNodeComponent<T extends KuduFlowNode>
  implements OnDestroy
{
  public node = model.required<T>();

  private cleaner$ = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private workspaceService: KuduFlowWorkspaceService,
    private workspaceEventsDirective: KuduFlowWorkspaceEventsDirective,
  ) {}

  @HostBinding('class.node--movable')
  public get Movable() {
    return this.node().isMovable;
  }

  @HostBinding('class.node--resizable')
  public get Resizable() {
    return this.node().isResizable;
  }

  @HostBinding('class.node--rotatable')
  public get Rotatable() {
    return this.node().isRotatable;
  }

  @HostBinding('style.width.px')
  public get Width() {
    const node = this.node();
    return node.isResizable ? node.width : undefined;
  }

  @HostBinding('style.height.px')
  public get Height() {
    const node = this.node();
    return node.isResizable ? node.height : undefined;
  }

  @HostBinding('style.transform')
  public get Transform() {
    const node = this.node();

    if (node.isMovable && node.isRotatable) {
      return `translate(${node.x}px, ${node.y}px) rotate(${node.rotate}deg)`;
    }

    if (node.isMovable) {
      return `translate(${node.x}px, ${node.y}px)`;
    }

    if (node.isRotatable) {
      return `rotate(${node.rotate}deg)`;
    }

    return undefined;
  }

  ngOnDestroy(): void {
    this.cleaner$.next();
    this.cleaner$.complete();
  }

  @HostListener('mousedown', ['$event'])
  public handleStartMove(e: MouseEvent) {
    if (e.buttons !== 1) {
      return;
    }

    const node = this.node();

    if (!node.isMovable) {
      return;
    }

    const rect = (e.target as HTMLElement).getBoundingClientRect();

    const mouseOffset = {
      x: e.clientX - rect.x,
      y: e.clientY - rect.y,
    };

    this.document.body.style.cursor = 'grabbing';

    this.workspaceEventsDirective.mousemove$
      .pipe(takeUntil(this.cleaner$))
      .subscribe((event) => this.handleMove(event, mouseOffset));

    this.workspaceEventsDirective.mouseup$
      .pipe(takeUntil(this.cleaner$))
      .subscribe((event) => this.handleStopMove(event));

    this.workspaceEventsDirective.mouseleave$
      .pipe(takeUntil(this.cleaner$))
      .subscribe((event) => this.handleStopMove(event));
  }

  public handleMove(e: MouseEvent, mouseOffset: Point) {
    const node = this.node();

    if (!node.isMovable) {
      return;
    }

    const scale = this.workspaceService.scale();
    const scroll = this.workspaceService.scroll();
    const offset = this.workspaceService.offset();

    this.node.set({
      ...node,
      x: (e.clientX - scroll.x - mouseOffset.x - offset.left) / scale,
      y: (e.clientY - scroll.y - mouseOffset.y - offset.top) / scale,
    });
  }

  public handleStopMove(e: MouseEvent) {
    this.document.body.style.cursor = 'auto';
    this.cleaner$.next();
  }

  public handleStartResize(e: MouseEvent, direction: ResizeDirection) {
    if (e.buttons !== 1) {
      return;
    }

    e.stopPropagation();

    this.workspaceEventsDirective.mousemove$
      .pipe(takeUntil(this.cleaner$))
      .subscribe((event) => this.handleResize(event, direction));

    this.workspaceEventsDirective.mouseup$
      .pipe(takeUntil(this.cleaner$))
      .subscribe((event) => this.handleStopResize(event));

    this.workspaceEventsDirective.mouseleave$
      .pipe(takeUntil(this.cleaner$))
      .subscribe((event) => this.handleStopResize(event));
  }

  public handleResize(e: MouseEvent, direction: ResizeDirection) {
    const node = this.node();

    if (!node.isResizable) {
      return;
    }

    const scale = this.workspaceService.scale();
    const scroll = this.workspaceService.scroll();
    const offset = this.workspaceService.offset();

    const mousePosition = {
      x: (e.clientX - scroll.x - offset.left) / scale,
      y: (e.clientY - scroll.y - offset.top) / scale,
    };

    const clone = tryResizeNode({ ...node }, direction, mousePosition);

    if (clone) {
      this.node.set(clone as T);
    }
  }

  public handleStopResize(e: MouseEvent) {
    this.document.body.style.cursor = 'auto';
    this.cleaner$.next();
  }
}
