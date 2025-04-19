import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { resizeObservable } from '@kudu-ng-utils';

import {
  WORKSPACE_SCALING_DELTA,
  WORKSPACE_SCALING_MAX,
  WORKSPACE_SCALING_MIN,
  WORKSPACE_SCROLLING_DELTA,
} from '../constants';

import { Point } from '../../../interfaces';
import { KuduFlowWorkspaceScale, KuduFlowWorkspaceScroll } from '../interfaces';

@Directive()
export class KuduFlowWorkspaceDirective {
  private document = inject(DOCUMENT);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public scroll = model<KuduFlowWorkspaceScroll>({ x: 0, y: 0 });
  public scale = model<KuduFlowWorkspaceScale>(1);

  public layout = toSignal(
    resizeObservable(this.elementRef).pipe(
      map((entry) => entry.target.getBoundingClientRect()),
    ),
  );

  public setScroll(scroll: KuduFlowWorkspaceScroll) {
    this.scroll.set(scroll);
  }

  public setScale(scale: KuduFlowWorkspaceScale) {
    this.scale.set(scale);
  }

  public scrollLeft() {
    const scroll = this.scroll();
    const scale = this.scale();

    this.scroll.set({
      ...scroll,
      x: scroll.x + WORKSPACE_SCROLLING_DELTA / scale,
    });
  }

  public scrollRight() {
    const scroll = this.scroll();
    const scale = this.scale();

    this.scroll.set({
      ...scroll,
      x: scroll.x - WORKSPACE_SCROLLING_DELTA / scale,
    });
  }

  public scrollUp() {
    const scroll = this.scroll();
    const scale = this.scale();

    this.scroll.set({
      ...scroll,
      y: scroll.y + WORKSPACE_SCROLLING_DELTA / scale,
    });
  }

  public scrollDown() {
    const scroll = this.scroll();
    const scale = this.scale();

    this.scroll.set({
      ...scroll,
      y: scroll.y - WORKSPACE_SCROLLING_DELTA / scale,
    });
  }

  public scrollBack() {
    const layout = this.layout();

    if (!this.document.defaultView || !layout) {
      return;
    }

    const { width, height } = layout;

    const elementCenter = {
      x: width / 2,
      y: height / 2,
    };

    const windowCenter = {
      x: (this.document.defaultView.innerWidth - layout.left) / 2,
      y: (this.document.defaultView.innerHeight - layout.top) / 2,
    };

    this.scroll.set({
      x: windowCenter.x - elementCenter.x,
      y: windowCenter.y - elementCenter.y,
    });
  }

  public scaleIn(mousePosition: Point) {
    const scale = this.scale();
    const nextScale = scale + WORKSPACE_SCALING_DELTA * scale;
    return this.scaling(nextScale, mousePosition);
  }

  public scaleOut(mousePosition: Point) {
    const scale = this.scale();
    const nextScale = scale + -1 * WORKSPACE_SCALING_DELTA * scale;
    return this.scaling(nextScale, mousePosition);
  }

  public scaleTo(nextScale: number) {
    const layout = this.layout();

    if (!this.document.defaultView || !layout) {
      return;
    }

    const mousePosition = {
      x: (this.document.defaultView.innerWidth - layout.left) / 2,
      y: (this.document.defaultView.innerHeight - layout.top) / 2,
    };

    return this.scaling(nextScale, mousePosition);
  }

  private scaling(nextScale: number, mousePosition: Point) {
    const scroll = this.scroll();
    const scale = this.scale();

    if (WORKSPACE_SCALING_MIN > nextScale) {
      nextScale = WORKSPACE_SCALING_MIN;
    }

    if (WORKSPACE_SCALING_MAX < nextScale) {
      nextScale = WORKSPACE_SCALING_MAX;
    }

    const diff = {
      x: scroll.x / scale - mousePosition.x / scale,
      y: scroll.y / scale - mousePosition.y / scale,
    };

    this.scroll.set({
      x: scroll.x + diff.x * (nextScale - scale),
      y: scroll.y + diff.y * (nextScale - scale),
    });

    this.scale.set(nextScale);
  }
}
