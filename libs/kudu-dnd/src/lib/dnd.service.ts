import { inject, Injectable, RendererFactory2, signal } from '@angular/core';

import { KuduDragRef } from './drag-ref';
import { KuduDragDirective } from './drag.directive';
import { KuduDropContainerDirective } from './drop-container.directive';

import { Point } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class KuduDnDService {
  private rendererFactory = inject(RendererFactory2);
  private renderer = this.rendererFactory.createRenderer(null, null);

  private _dragRef = signal<KuduDragRef | null>(null);
  public dragRef = this._dragRef.asReadonly();

  public dragstart(draggable: KuduDragDirective) {
    const dragRef = new KuduDragRef(
      this.renderer,
      draggable,
      draggable.container(),
    );

    this._dragRef.set(dragRef);
  }

  public dragend() {
    this._dragRef.set(null);
  }

  public dragover(container: KuduDropContainerDirective, position: Point) {
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
