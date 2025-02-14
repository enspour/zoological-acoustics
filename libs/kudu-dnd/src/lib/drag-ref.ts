import { Renderer2 } from '@angular/core';

import { KuduDragDirective } from './drag.directive';
import { KuduDropContainerDirective } from './drop-container.directive';

import { Point } from './interfaces';

export interface KuduDragInstance {
  draggable: KuduDragDirective;
  source: {
    container: KuduDropContainerDirective;
    index: number;
  };
  target: {
    container: KuduDropContainerDirective;
    index: number;
  };
}

export class KuduDragRef {
  private instance: KuduDragInstance;

  constructor(
    private renderer: Renderer2,
    draggable: KuduDragDirective,
    container: KuduDropContainerDirective,
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

  public move(container: KuduDropContainerDirective, position: Point) {
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
    container: KuduDropContainerDirective,
    position: Point,
  ) {
    return container
      .children()
      .findIndex((element) => this.isOverElement(element, position));
  }

  private isOverElement(element: KuduDragDirective, position: Point) {
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
    container: KuduDropContainerDirective,
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

  private isValidTypes(container: KuduDropContainerDirective) {
    return container.types().includes(this.instance.draggable.type());
  }

  public moveDraggable(container: KuduDropContainerDirective, index: number) {
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
