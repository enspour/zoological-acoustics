import {
  contentChildren,
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  linkedSignal,
  output,
} from '@angular/core';

import { KuduDnDService } from './dnd.service';
import { KuduDragDirective } from './drag.directive';

import { KuduDrag, KuduDrop } from './interfaces';

@Directive({
  selector: '[kuduDropContainer]',
})
export class KuduDropContainerDirective<T = any> {
  private dndService = inject(KuduDnDService);

  public elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private _children = contentChildren(KuduDragDirective);
  public children = linkedSignal({
    source: this._children,
    computation: (content) => content,
  });

  public types = input.required<string[]>({ alias: 'kuduDropContainerTypes' });
  public data = input<T>(undefined, { alias: 'kuduDropContainerData' });
  public disabled = input(false, { alias: 'kuduDropContainerDisabled' });

  public byDrop = output<KuduDrop>();
  public byDragOver = output<KuduDrag>();
  public byDragEnter = output<KuduDrag>();
  public byDragLeave = output<KuduDrag>();

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const instance = this.dndService.drop();

    if (instance) {
      this.byDrop.emit({
        event,
        draggable: instance.draggable.data(),
        prevIndex: instance.source.index,
        prevContainer: instance.source.container.data(),
        nextIndex: instance.target.index,
        nextContainer: instance.target.container.data(),
      });

      this.dndService.reset();
    }
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent) {
    event.preventDefault();

    if (this.disabled()) {
      return;
    }

    this.dndService.dragover(this, {
      x: event.clientX,
      y: event.clientY,
    });

    this.byDragOver.emit({ event });
  }

  public insertChild(child: KuduDragDirective, index: number) {
    this.children.update((children) => children.toSpliced(index, 0, child));
  }

  public removeChild(child: KuduDragDirective) {
    this.children.update((children) => children.filter((e) => e !== child));
  }

  public indexChildOf(child: KuduDragDirective) {
    return this.children().indexOf(child);
  }
}
