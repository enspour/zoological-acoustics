import { Renderer2 } from '@angular/core';

import { KuduDndDragDirective } from './drag.directive';
import { KuduDndDropContainerDirective } from './drop-container.directive';

import { Point } from './interfaces';

export interface KuduDndDragInstance {
  draggable: KuduDndDragDirective;
  source: {
    container: KuduDndDropContainerDirective;
    index: number;
  };
  target: {
    container: KuduDndDropContainerDirective;
    index: number;
  };
}

export class KuduDndDragRef {
  private instance: KuduDndDragInstance;

  constructor(
    private renderer: Renderer2,
    draggable: KuduDndDragDirective,
    container: KuduDndDropContainerDirective,
  ) {
    this.instance = {
      draggable,
      source: {
        container,
        index: container.indexChildOf(draggable),
      },
      target: {
        container,
        index: container.indexChildOf(draggable),
      },
    };
  }

  public get Instance() {
    return this.instance;
  }

  public move(container: KuduDndDropContainerDirective, position: Point) {
    if (!this.isValidTypes(container)) {
      return;
    }

    const index = this.findNextIndex(container, position);

    if (!this.isValidNextIndex(container, index)) {
      return;
    }

    this.moveDraggable(container, index);
  }

  public reset() {
    const { container, index } = this.instance.source;
    this.moveDraggable(container, index);
  }

  private findNextIndex(
    container: KuduDndDropContainerDirective,
    position: Point,
  ) {
    return container
      .children()
      .findIndex((element) => this.isOverElement(element, position));
  }

  private isOverElement(element: KuduDndDragDirective, position: Point) {
    const rect = element.elementRef.nativeElement.getBoundingClientRect();

    if (
      rect.x <= position.x &&
      position.x <= rect.x + rect.width &&
      rect.y <= position.y &&
      position.y <= rect.y + rect.height
    ) {
      return true;
    }

    return false;
  }

  private isValidNextIndex(
    container: KuduDndDropContainerDirective,
    index: number,
  ) {
    if (index === -1) {
      return false;
    }

    return !(
      this.instance.target.index === index &&
      this.instance.target.container === container
    );
  }

  private isValidTypes(container: KuduDndDropContainerDirective) {
    return container.types().includes(this.instance.draggable.type());
  }

  public moveDraggable(
    container: KuduDndDropContainerDirective,
    index: number,
  ) {
    const placeholder = this.instance.draggable.elementRef.nativeElement;

    const prevContainer = this.instance.target.container;
    const prevParent = prevContainer.elementRef.nativeElement;

    this.renderer.removeChild(prevParent, placeholder);
    prevContainer.removeChild(this.instance.draggable);

    const nextParent = container.elementRef.nativeElement;
    const before = container.children().at(index)?.elementRef.nativeElement;

    if (before) {
      this.renderer.insertBefore(nextParent, placeholder, before);
    } else {
      this.renderer.appendChild(nextParent, placeholder);
    }

    container.insertChild(this.instance.draggable, index);

    this.instance.draggable.container.set(container);
    this.instance.target = {
      container,
      index: index,
    };
  }
}
