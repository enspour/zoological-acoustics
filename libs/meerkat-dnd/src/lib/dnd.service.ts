import { inject, Injectable, RendererFactory2, signal } from '@angular/core';

import { MkDndDragRef } from './drag-ref';
import { MkDndDragDirective } from './drag.directive';
import { MkDndDropContainerDirective } from './drop-container.directive';

import { Point } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class MkDndService {
  private rendererFactory = inject(RendererFactory2);
  private renderer = this.rendererFactory.createRenderer(null, null);

  private _dragRef = signal<MkDndDragRef | null>(null);
  public dragRef = this._dragRef.asReadonly();

  public dragstart(draggable: MkDndDragDirective) {
    const dragRef = new MkDndDragRef(
      this.renderer,
      draggable,
      draggable.container(),
    );

    this._dragRef.set(dragRef);
  }

  public dragend() {
    this._dragRef.set(null);
  }

  public dragover(container: MkDndDropContainerDirective, position: Point) {
    const dragRef = this._dragRef();

    if (!dragRef) {
      return;
    }

    dragRef.move(container, position);
  }

  public drop() {
    const dragRef = this._dragRef();

    if (!dragRef || !dragRef.Instance.target) {
      return null;
    }

    return dragRef.Instance;
  }

  public reset() {
    const dragRef = this._dragRef();

    if (!dragRef || !dragRef.Instance.target) {
      return;
    }

    dragRef.reset();
  }
}
